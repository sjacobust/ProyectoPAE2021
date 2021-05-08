import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {


  socketClient:any;

  constructor() { }

  connect(cb:any) {
    this.socketClient = socketIo.io(environment.socketUrl);
    cb();
  }

  // on(eventName, callback) {

  // }
  
  // emit(eventName, data) {}

  // broadcast(eventName, data) {}

  disconnect() {
    if (this.socketClient && this.socketClient.connected) {
      this.socketClient.disconnect();
    }
  }
}
