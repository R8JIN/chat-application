import { Component, Input } from '@angular/core';
import { Messages } from '../../models/messages';
import { CommonModule } from '@angular/common';
import { LocalService } from '../../../core/local.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  @Input() message!:Messages;
  clientId: string= '';
  constructor(private localService:LocalService){
    this.clientId = this.localService.getData("id");
  }
}
