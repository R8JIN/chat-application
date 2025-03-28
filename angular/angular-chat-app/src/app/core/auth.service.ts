import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:8080/api/v1/auth"
  
  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<any>{

    const headers = {
      'Content-Type': 'application/json',
    }
    const body = {
      'username': username, 'password': password
    }
    return this.http.post<any>(this.apiUrl+"/login", JSON.stringify(body), {headers: headers})
  }

  signup(username: any, email:any, password: any): Observable<any>{

    const headers = {
      'Content-Type': 'application/json',
    }
    const body = {
      'username': username, 'email': email, 'password': password
    }
    return this.http.post<any>(this.apiUrl+"/signup", JSON.stringify(body), {headers: headers})
  }
}
