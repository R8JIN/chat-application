import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../../../core/web-socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../message/message.component';
import { ReceiveMsgComponent } from '../receive-msg/receive-msg.component';
import { Messages } from '../../models/messages';


@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent, ReceiveMsgComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent implements OnInit {
  clientId: string= '2';
  @Input() targetClientId : string = '';
  messageInput!: string;
  messages: Messages[] = [];
  sent: string[] = [];
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    if (this.clientId) {
      this.webSocketService.connect(this.clientId);
      console.log("The client id is ", this.clientId );
      this.webSocketService.getMessages().subscribe((message:Messages) => {
        this.messages.push(message);
        console.log("The message", message.message);
      });
    }
  }

  connect(): void {
    if (this.clientId) {
      this.webSocketService.connect(this.clientId);
      console.log("The client id is ", this.clientId );
      this.webSocketService.getMessages().subscribe((response:Messages) => {;
        console.log("The message", typeof(response));
        this.messages.push(response);
      
      });
    }
  }

  sendMessage(): void {
    if (this.targetClientId && this.messageInput) {
      this.webSocketService.sendMessage('2', this.targetClientId, this.messageInput);
      const sentMessage: Messages = {
        senderClientId: '2',
        targetClientId: this.targetClientId,
        message: this.messageInput
      }
      this.sent.push(this.messageInput);
      this.messages.push(sentMessage);
      this.messageInput = '';
    }
  }
}