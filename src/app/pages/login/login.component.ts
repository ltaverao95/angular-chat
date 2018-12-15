import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';

  constructor(public wsService: WebsocketService) { }

  ngOnInit() {
  }

  signin(){

    if(!this.username){
      return;
    }

    this.wsService.loginWS(this.username);
  }
}
