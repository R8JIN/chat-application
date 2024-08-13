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
import { Notification } from '../../models/notification';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../core/client.service';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../../core/notification.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatBoxComponent,ChatNavbarComponent, 
            LogoutComponent, ProfileComponent, RouterModule, 
            NotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 
  targetId: string= '';
  targetFirstName: string = '';
  clientId: string = '';
  username: string = '';
  firstName: string = '';
  lastName: string = '';


  logged: boolean = true;


  chatMessageService = inject(ChatMessageService);
  chatMessageList: any = [];
  messageTimeStampList: Date[] = [];
  recentTimeStamp!: Date;
  newNotifications:any = []

  constructor(private localService: LocalService, 
              private clientService: ClientService,
              private sharedService: SharedService,
              private webSocketService: WebSocketService,
              private notificationService: NotificationService,
              private toastr: ToastrService){

    this.chatMessageList = [];
    this.messageTimeStampList = [];
    this.newNotifications = [];
    
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
    this.sharedService.currentValue.subscribe((data:any)=>{
      if(data?.id != null){
        this.addItem(data);
      }
    })
    this.webSocketService.getMessages().subscribe((message:any) => {
      if(this.targetId == ''){
        this.clientService.getByClientId(message.senderClientId).subscribe(
          (response:any)=>{
            const senderName = response.data.firstName + " " + response.data.lastName;

            const notification: Notification = {
              message: message,
              isSeen: false
          }
            
          this.notificationService.saveNotification(message).subscribe((response:any)=>{ 
            this.notificationService.addItem(response.data);
          })

            this.showSuccess("New Message from " + senderName);
          
        }) 
        
      }
    });

  }

  addItem(data:any){

    this.targetId = data.id;

    this.targetFirstName = data.firstName;
    
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


}
