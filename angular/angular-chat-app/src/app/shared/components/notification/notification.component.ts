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

  @Input() count:number = 0;

  notifications: any = [];
  constructor(private notificationService: NotificationService, 
              private localService:LocalService){

  }

  ngOnInit(){
    this.notificationService.getClientsNotification(this.localService.getData("id"))
    .subscribe((response:any) =>{
      
        this.notificationService.notificationList = this.notifications = response.data.reverse();

    })
  }


  ngOnChanges(changes: SimpleChanges): void {

      if(changes['count']){

        this.notifications = this.notificationService.notificationList;
        this.count = this.notificationService.notificationList.filter((value:any) => value.isSeen !== true).length;
        console.log("The value change count", this.count);
      }

  }

  // seenNewNotification(id:number){
  //   this.notificationService.notificationSeen(id).subscribe((response:any)=>{
  //         const item = this.newNotifications.find((i:any) => i.id === id);
  //         if (item) {
  //           item.isSeen = true;
  //         }
  //         console.log("The new notifications ", this.newNotifications);
  //     });
  // }


  seen(id:number){
    this.notificationService.notificationSeen(id).subscribe((response:any)=>
    {
        const item = this.notifications.find((i:any) => i.id === id);
        if (item) {
          item.isSeen = true;
        }
        this.count = this.notifications.filter((value:any) => value.isSeen !== true).length;
        console.log("The new notifications ", this.notifications);
    }
    )
  }
}
