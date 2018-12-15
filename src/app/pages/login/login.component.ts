import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';

  constructor(public wsService: WebsocketService,
              private router: Router) { }

  ngOnInit() {
  }

  signin(){

    if(!this.username){
      return;
    }

    this.wsService.loginWS(this.username).then(() => {
        this.router.navigateByUrl('/messages');
    });
  }
}
