import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from '../../../core/notification.service';
import { LocalService } from '../../../core/local.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  count:number = 0;

  notifications: any = [];
  constructor(private notificationService: NotificationService, 
              private localService:LocalService){

  }

  ngOnInit(){
    this.notificationService.getClientsNotification(this.localService.getData("id"))
    .subscribe((response:any) =>{
      
        this.notificationService.setData(response.data.reverse());
        
        this.notificationService.getData$().subscribe((data:any) => {
          this.notifications = data;
          console.log("The notifications are ", this.notifications);
          this.count = this.notifications.filter((value:any) => value.isSeen !== true).length;
        })
        

    })
  }


  ngOnChanges(changes: SimpleChanges): void {

    console.log("The value change count", this.count);
      

  }


  seen(id:number){

    if(!this.notifications.isSeen){
      this.notificationService.notificationSeen(id).subscribe((response:any)=>
      {
          const item = this.notifications.find((i:any) => i.id === id);
          if (item) {
            item.isSeen = true;
          }
          this.count = this.notifications.filter((value:any) => value.isSeen !== true).length;
          // console.log("The new notifications ", this.notifications);
      }
      )
    }
  }
}
