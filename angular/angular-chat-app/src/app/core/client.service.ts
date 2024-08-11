import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl = 'http://localhost:8080/api/v1/client';
  localSevice = inject(LocalService);
  constructor(private http:HttpClient) { }


  getClients(): Observable<any>{
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localSevice.getData("token")}`
    }); 
    return this.http.get<any>(this.apiUrl+"?id="+this.localSevice.getData("id"),{headers: header});
  }

  getByClientId(clientId: string): Observable<any>{
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localSevice.getData("token")}`
    }); 
    return this.http.get<any>(this.apiUrl + "/by-id?id=" + clientId, {headers: header});
  }
}
