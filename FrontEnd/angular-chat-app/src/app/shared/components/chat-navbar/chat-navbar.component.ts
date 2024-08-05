import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ChatMessageService } from '../../../core/chat-message.service';

@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.css'
})
export class ChatNavbarComponent {
  
  chatMessageService = inject(ChatMessageService)

  targetId: string = '';
  clientId: string =  '2';

  chatMessageList: any = [];
  @Output() messageEvent = new EventEmitter();

  constructor() { }

  sendMessage(targetId: string) {
    console.log("The target Id is", targetId);
    this.messageEvent.emit(targetId);


  }

  getMessage(){

  }
}
