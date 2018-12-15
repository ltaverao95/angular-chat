import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'ngx-socket-io/node_modules/rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  text = '';
  messagesSubscription: Subscription;
  element: HTMLElement;
  messages: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(){

    this.element = document.getElementById('chat-messages');

    this.messagesSubscription = this.chatService.getMessages().subscribe((msg: string) => {
      this.messages.push(msg);
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy(){
    this.messagesSubscription.unsubscribe();
  }

  send(){

    if(!this.text){
      return;
    }

    this.chatService.sendMessage(this.text);
    this.text = '';
  }
}
