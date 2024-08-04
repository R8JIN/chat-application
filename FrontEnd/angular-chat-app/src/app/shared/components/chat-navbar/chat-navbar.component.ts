import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.css'
})
export class ChatNavbarComponent {
  
  targetId: string = '';

  @Output() messageEvent = new EventEmitter();

  constructor() { }

  sendMessage(targetId: string) {
    console.log("The target Id is", targetId);
    this.messageEvent.emit(targetId);

  }

}
