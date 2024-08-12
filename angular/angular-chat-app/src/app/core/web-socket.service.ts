// src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Messages } from '../shared/models/messages';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject: Subject<Messages> = new Subject();

  constructor() { }

  public connect(clientId: string): void {
    this.socket = new WebSocket(`ws://localhost:8080/ws?clientId=${encodeURIComponent(clientId)}`);

    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.socket.onmessage = (event) => {
      const data: Messages = JSON.parse(event.data);
      this.messageSubject.next(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  public sendMessage(senderClientId:string, targetClientId: string, message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ senderClientId, targetClientId, message }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  public getMessages():Observable<Messages> {
    return this.messageSubject.asObservable();
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket connection closed by client');
    }
  }
}
