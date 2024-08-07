import { Component, inject, Input } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { ChatNavbarComponent } from '../chat-navbar/chat-navbar.component';
import { ChatMessageService } from '../../../core/chat-message.service';
import { LocalService } from '../../../core/local.service';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatBoxComponent,ChatNavbarComponent, LogoutComponent, ProfileComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  targetId: string= '';
  targetFirstName: string = '';
  clientId: string = '';
  logged: boolean = true;
  

  username: string = '';
  firstName: string = '';
  lastName: string = '';

  chatMessageService = inject(ChatMessageService);
  chatMessageList: any = [];
  messageTimeStampList: Date[] = [];
  recentTimeStamp!: Date;

  constructor(private localService: LocalService){
    if(this.localService.getData("id")){
      this.clientId = this.localService.getData("id");

      this.username = this.localService.getData("username");
      this.firstName = this.localService.getData("firstName");
      this.lastName = this.localService.getData("lastName");
      
    }
    else{
      this.logged = false;
    }

  }

  addItem(data:any){
    this.targetId = data.targetId;
    this.targetFirstName = data.targetFirstName;
    
    console.log("The home targetId is", this.targetId);
    this.chatMessageList = [];
    this.messageTimeStampList = [];
    
    if(this.localService.getData("id")){
    
      this.chatMessageService.getMessage(this.localService.getData("id"), this.targetId,
       this.localService.getData("token")).subscribe(
        response => {
          this.chatMessageList = response.data;
          console.log("The message list", this.chatMessageList);

          const messageList = response.data;
          const dateList: Date[] = [];
          for(let message of messageList){
            dateList.push(new Date(message.messageTimeStamp));
          }
          this.messageTimeStampList = this.getDistinctDates(dateList);
          this.recentTimeStamp = this.messageTimeStampList[this.messageTimeStampList.length-1]
          console.log("The message time stamp ", this.recentTimeStamp);
    
        }
      )
     
    }
  }


  getDistinctDates(timestamps: Date[]): Date[] {
    const distinctDates = new Set<string>();
    const result: Date[] = [];
  
    timestamps.forEach((timestamp) => {
      const dateStr = timestamp.toISOString().split('T')[0];
      if (!distinctDates.has(dateStr)) {
        distinctDates.add(dateStr);
        result.push(new Date(dateStr));
      }
    });
    console.log("The result is", result);
    return result;
  }

}
