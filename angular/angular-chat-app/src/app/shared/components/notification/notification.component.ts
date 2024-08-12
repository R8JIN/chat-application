import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from '../../../core/notification.service';
import { LocalService } from '../../../core/local.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  @Input() newNotifications:any = [];
  oldNotifications: any = [];
  count: number = 0;
  constructor(private notificationService: NotificationService, 
              private localService:LocalService){
    this.oldNotifications = [];

  }

  ngOnInit(){
    this.notificationService.getClientsNotification(this.localService.getData("id"))
    .subscribe((response:any) =>{
        console.log("the notification is ", response.data);
        this.oldNotifications = response.data.reverse();
        const notifications = this.newNotifications;
        const oldNotificationCount = this.oldNotifications.filter((value:any) => value.isSeen !== true).length;
        const newNotificationsCount = notifications.filter((value:any) =>value.isSeen !== true).length;

        this.count = oldNotificationCount + newNotificationsCount;
        console.log("The message count is ", this.count);
        // this.notificationService.notificationList = this.notifications;

    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['newNotifications']) {
      console.log("The value");
      const oldNotificationCount = this.oldNotifications.filter((value:any) => value.isSeen !== true).length;
      const newNotificationsCount = this.newNotifications.filter((value:any) =>value.isSeen !== true).length;
      this.count = oldNotificationCount + newNotificationsCount;

    }

  }

  getNotification(){

  }

  seen(id:number){
    this.notificationService.notificationSeen(id).subscribe((response:any)=>
    {
        console.log("The response is ", response);
    }
    )
  }
}
