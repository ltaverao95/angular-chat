import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { 
  url: environment.wsURL, 
  options: {} 
};

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    WebsocketService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
