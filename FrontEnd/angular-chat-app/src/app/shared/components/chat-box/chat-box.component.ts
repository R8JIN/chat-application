import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { WebSocketService } from '../../../core/web-socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../message/message.component';
import { ReceiveMsgComponent } from '../receive-msg/receive-msg.component';
import { Messages } from '../../models/messages';
import { ChatMessageService } from '../../../core/chat-message.service';
import { LocalService } from '../../../core/local.service';
import { TimestampComponent } from '../timestamp/timestamp.component';


@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent, ReceiveMsgComponent, TimestampComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent  {
  
  chatMessageService = inject(ChatMessageService)
  localService = inject(LocalService)
  clientId: string = '';
  
  @Input() targetFirstName: string = '';
  @Input() targetClientId : string = '';

  targetId: string = '';
  messageInput!: string;

  @Input() chatMessageList:any = [];
  @Input() messageTimeStampList: Date[] = [];
  messageList: any = [];

  messages: Messages[] = [];
  sent: string[] = [];

  dateToday: any;

  constructor(private webSocketService: WebSocketService) {
    
    this.dateToday = Date.now().toString();
  }


  ngOnInit(): void {
    if (this.localService.getData("id")) {
      this.messages= [];
      this.clientId = this.localService.getData("id");
      this.webSocketService.connect(this.localService.getData("id"));
      
      console.log("The client id is ", this.localService.getData("id") );
      this.webSocketService.getMessages().subscribe((message:Messages) => {
        this.messages.push(message);
        console.log("The message", message);
       
      });

      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetClientId']) {
      this.messages = [];
      this.targetId = this.targetClientId

      

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
      this.webSocketService.sendMessage(this.clientId, this.targetClientId, this.messageInput);
      const sentMessage: Messages = {
        senderClientId: this.clientId,
        targetClientId: this.targetClientId,
        message: this.messageInput,
        messageTimeStamp: Date.now().toString()
      }
      this.sent.push(this.messageInput);
      this.messages.push(sentMessage);
      this.messageInput = '';
    
    }
  }
}