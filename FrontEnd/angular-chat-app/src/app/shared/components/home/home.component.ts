import { Component, inject, Input } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { ChatNavbarComponent } from '../chat-navbar/chat-navbar.component';
import { ChatMessageService } from '../../../core/chat-message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatBoxComponent,ChatNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  targetId: string= '';
  clientId: string = '2';
  
  chatMessageService = inject(ChatMessageService);
  chatMessageList: any = [];
  
  addItem(newTargetId:string){
    this.targetId = newTargetId;
    console.log("The home targetId is", this.targetId);

    if(this.clientId){
      this.chatMessageService.getMessage(this.clientId, this.targetId).subscribe(
        response => {
          this.chatMessageList = response.data;
          console.log("The message list", this.chatMessageList);
        }
      )
    }
  }

}
