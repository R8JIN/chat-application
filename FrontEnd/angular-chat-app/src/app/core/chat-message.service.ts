import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {
  
  apiUrl = "http://localhost:8080/api/v1/chat-message";

  constructor(private http:HttpClient) { }

  getMessage(senderClientId: string, targetClientId: string, auth_token: string):Observable<any>{

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }); 

    console.log("The target client id ", targetClientId);

    return this.http.get<any>("http://localhost:8080/api/v1/chat-message?senderClientId="
                                +senderClientId+"&targetClientId="+targetClientId,
                                {headers: header});
  }
}
