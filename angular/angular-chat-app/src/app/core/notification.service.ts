import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';
import { Messages } from '../shared/models/messages';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  localService = inject(LocalService);

  notificationList:any = []
  apiUrl = "http://localhost:8080/api/v1/notification"
  constructor(private http:HttpClient) { }

  getClientsNotification(clientId:string):Observable<any>{
    
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localService.getData("token")}`
    }); 

    return this.http.get<any>(this.apiUrl+"/client?id="+clientId, {headers:header});
  }

  saveNotification(message:any): Observable<any>{
    const token = this.localService.getData('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = {
      'message':message
    }

    console.log("Payload is ", message);
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), {headers:header})
  }

  notificationSeen(id:any): Observable<any>{
    console.log("The id is", id);
    const token = this.localService.getData('token');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch<any>(this.apiUrl +"/seen?id=" + id,null, {headers:header} )
  }
}
