import { Component, inject, Input, OnInit } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { ChatNavbarComponent } from '../chat-navbar/chat-navbar.component';
import { ChatMessageService } from '../../../core/chat-message.service';
import { LocalService } from '../../../core/local.service';
import { LogoutComponent } from '../logout/logout.component';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WebSocketService } from '../../../core/web-socket.service';
import { Messages } from '../../models/messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatBoxComponent,ChatNavbarComponent, LogoutComponent, ProfileComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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

  constructor(private localService: LocalService, 
              private webSocketService: WebSocketService,
              private toastr: ToastrService){

    this.chatMessageList = [];
    this.messageTimeStampList = [];
    
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

  ngOnInit(){

    this.clientId = this.localService.getData("id");
    this.webSocketService.connect(this.localService.getData("id"));

    this.webSocketService.getMessages().subscribe((message:Messages) => {
      if(this.targetId == ''){
        this.showSuccess("New Message");
      }
    });

  }

  addItem(data:any){
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    this.targetId = data.targetId;
    this.targetFirstName = data.targetFirstName;
=======
=======
>>>>>>> Stashed changes

    this.targetId = data.id;
    this.targetFirstName = data.firstName;
>>>>>>> Stashed changes
    
    this.chatMessageList = [];
    this.messageTimeStampList = [];
    
    if(this.localService.getData("id")){
    
      this.chatMessageService.getMessage(this.localService.getData("id"), this.targetId,
       this.localService.getData("token")).subscribe(
        response => {
          this.chatMessageList = response.data;
          
          const messageList = response.data;
          const dateList: Date[] = [];
          
          for(let message of messageList){
            dateList.push(new Date(message.messageTimeStamp));
          }
          this.messageTimeStampList = this.getDistinctDates(dateList);
          this.recentTimeStamp = this.messageTimeStampList[this.messageTimeStampList.length-1]

    
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
   
    return result;
  }

  showSuccess(msg:string) {
    this.toastr.success(msg);
  }

  // showError(msg:string){
  //   this.toastr.error(msg);
  // }

}
