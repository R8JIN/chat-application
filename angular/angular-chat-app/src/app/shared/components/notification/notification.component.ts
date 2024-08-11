import { Component, OnInit } from '@angular/core';
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

  notifications: any = [];
  constructor(private notificationService: NotificationService, 
              private localService:LocalService){
    this.notifications = [];

  }

  ngOnInit(){
    this.notificationService.getClientsNotification(this.localService.getData("id"))
    .subscribe((response:any) =>{
        console.log("the notification is ", response.data);
        this.notifications = response.data;
        this.notificationService.notificationList = this.notifications;

    })
  }

  ngOnChanges(){

  }
  getNotification(){

  }
}
