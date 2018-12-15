import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { User } from '../classes/user';

@Injectable()
export class WebsocketService {

  public socketStatus = false;
  public user: User;

  constructor(private socket: Socket) {

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

  listen(event: string){
    return this.socket.fromEvent(event);
  }

  loginWS(name: string){
    this.emit('configure-user', {name}, (resp) => {
      console.log(resp);
    });
  }
}
