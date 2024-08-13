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
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../core/client.service';
import { NotificationService } from '../../../core/notification.service';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent,
            TimestampComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent  {
  
  chatMessageService = inject(ChatMessageService)
  localService = inject(LocalService)
  
  notificationCount: number = 0;

  @Input() targetFirstName: string = '';
  @Input() targetClientId : string = '';
  
  targetId: string = '';
  messageInput!: string;
  clientId: string = '';

  @Input() chatMessageList:any = [];
  @Input() messageTimeStampList: Date[] = [];
  @Input() recentTimeStamp!: Date;
  
  messageList: any = [];
  messages: Messages[] = [];
  // sent: string[] = [];

  dateToday: any;

  constructor(private toastr: ToastrService, 
              private clientService: ClientService,
              private notificationService: NotificationService,
              private webSocketService: WebSocketService) {
    
    this.dateToday = Date.now().toString();
  
    console.log("The response message is", this.targetClientId);
  }


  ngOnInit(): void {

    if (this.localService.getData("id")) {
      this.messages= [];
      
      this.clientId = this.localService.getData("id");

      console.log("The client id is ", this.localService.getData("id") );
      this.webSocketService.getMessages().subscribe((message:Messages) => {

        if(this.targetClientId ==  message.senderClientId){
          this.messages.push(message);
          console.log("The socket message new", this.messages);
        }
        else{
          this.clientService.getByClientId(message.senderClientId)
          .subscribe((response: any) => {
            const senderName = response.data.firstName + " " + response.data.lastName;

            this.notificationService.saveNotification(message)
            .subscribe((response:any)=>{
              this.notificationService.addItem(response.data);
            })
  
            this.showSuccess("New Message from " + senderName);
          }) 
          
        }
      });
    console.log("The notification count", this.notificationCount);
      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = [];
    if (changes['targetClientId']) {
      this.messages = [];
      this.targetId = this.targetClientId

    }

  }


  sendMessage(): void {
    if (this.targetClientId && this.messageInput) {
      this.webSocketService.sendMessage(this.clientId, this.targetClientId, this.messageInput);
      const sentMessage: Messages = {
        senderClientId: this.clientId,
        targetClientId: this.targetClientId,
        message: this.messageInput,
        messageTimeStamp: Date.now().toString(),
        id: 0
      }
      // this.sent.push(this.messageInput);
      this.messages.push(sentMessage);
      this.messageInput = '';
    
    }
  }

  showSuccess(msg:string) {
    this.toastr.success(msg);
  }

  showError(msg:string){
    this.toastr.error(msg);
  }
}