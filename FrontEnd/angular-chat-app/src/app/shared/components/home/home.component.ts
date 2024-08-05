import { Component, inject, Input } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { ChatNavbarComponent } from '../chat-navbar/chat-navbar.component';
import { ChatMessageService } from '../../../core/chat-message.service';
import { LocalService } from '../../../core/local.service';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatBoxComponent,ChatNavbarComponent, LogoutComponent, ProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  targetId: string= '';
  clientId: string = '';
  logged: boolean = false;
  
  chatMessageService = inject(ChatMessageService);
  chatMessageList: any = [];

  constructor(private localService: LocalService){
    if(this.localService.getData("id")){
      this.clientId = this.localService.getData("id");
      this.logged = true;
    }

  }

  addItem(newTargetId:string){
    this.targetId = newTargetId;
    console.log("The home targetId is", this.targetId);

    if(this.localService.getData("id")){
    
      this.chatMessageService.getMessage(this.localService.getData("id"), this.targetId,
       this.localService.getData("token")).subscribe(
        response => {
          this.chatMessageList = response.data;
          console.log("The message list", this.chatMessageList);
        }
      )
    }
  }

}
