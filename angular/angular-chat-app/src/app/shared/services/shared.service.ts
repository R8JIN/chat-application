import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private targetClientId = new BehaviorSubject<string>('');
  currentValue = this.targetClientId.asObservable();
  
  public setTargetClientId(targetClientId: string){
    console.log("The observable", targetClientId);
    this.targetClientId.next(targetClientId);
  }

  public getTargetClientId$(): Observable<string>{
    
    return this.targetClientId;
  }

  constructor() { }
}
