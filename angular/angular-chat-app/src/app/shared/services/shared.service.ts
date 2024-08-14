import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private targetClient = new BehaviorSubject<any>({});
  currentValue = this.targetClient.asObservable();

  public setTargetClientId(targetClient: any){
    console.log("The observable", targetClient);
    this.targetClient.next(targetClient);
  }

  public gettargetClient$(): Observable<string>{
    
    return this.targetClient;
  }

  constructor() { }
}
