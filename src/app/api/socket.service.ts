import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class SocketService {
  private socket: Subject<MessageEvent>;

  constructor () {
    const ws = new WebSocket(`ws://[::1]:5000/mediat`);
    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    );
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    this.socket = Subject.create(observer, observable);
  }

  send(data) {
    this.socket.next(data)
  }

  receive() {
    return this.socket
      .asObservable()
      .map(event => JSON.parse(event.data))
  }
}
