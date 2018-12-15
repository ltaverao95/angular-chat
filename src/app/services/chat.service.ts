import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable()
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage(message: string){
    const payload = {
      de: 'Fernando',
      cuerpo: message
    };

    this.wsService.emit('message', payload);
  }

  getMessages(){
    return this.wsService.listen('new-message');
  }
}