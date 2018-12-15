import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { User } from '../classes/user';

@Injectable()
export class WebsocketService {

  public socketStatus = false;
  public user: User;

  constructor(private socket: Socket) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  loginWS(name: string) {

    return new Promise((resolve, reject) => {

      this.emit('configure-user', { name }, (resp) => {

        this.user = new User(name);
        this.saveStorage();

        resolve();
      });
    });
  }

  getUser(){
    return this.user;
  }

  saveStorage(){
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage(){
    if(!localStorage.getItem('user')){
      return;
    }
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loginWS(this.user.name);
  }
}
