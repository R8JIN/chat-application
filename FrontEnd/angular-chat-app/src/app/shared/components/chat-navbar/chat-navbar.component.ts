import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ChatMessageService } from '../../../core/chat-message.service';
import { ClientService } from '../../../core/client.service';
import { error } from 'console';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.css'
})
export class ChatNavbarComponent {
  
  chatMessageService = inject(ChatMessageService);
  clientService = inject(ClientService);

  targetId: string = '';
  clientId: string =  '2';
  targetFirstName: string = '';
  clientList: any = [];

  chatMessageList: any = [];
  @Output() messageEvent = new EventEmitter<{targetId:string, targetFirstName:string}>();

  constructor() {
    this.clientService.getClients().subscribe(response=>{
      this.clientList = response.data;
      console.log("The clientList is ", this.clientList);
    },
    error=>{
      console.log(error);
    }
    )
   }

  sendMessage(targetId: string, targetFirstName: string) {
    // console.log("The target Id is", targetId);
    this.messageEvent.emit({targetId, targetFirstName});
    // this.messageEvent.emit(targetFirstName);

  }


}
