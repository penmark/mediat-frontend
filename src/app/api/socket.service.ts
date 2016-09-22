import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TranscodeProgress } from '../item/item.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class SocketService {
  private socket: Subject<MessageEvent>;

  constructor (private store: Store<any>) {
    const ws = new WebSocket(`wss://api.wka.se/mediat/`);
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
    store.subscribe(this.receive())
  }

  send(data) {
    this.socket.next(data)
  }

  receive() {
    return this.socket
      .asObservable()
      .map(event => JSON.parse(event.data))
      .map(this.mapSocketEvent)
      .filter(data => data != null)

  }

  mapSocketEvent(data) {
    console.debug('socket event', data);
    switch (data.type) {
      case 'progress': {
        return new TranscodeProgress(data.payload);
      }
      default: {
        return null
      }
    }
  }
}
