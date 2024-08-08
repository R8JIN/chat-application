import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(){

  }
  public saveData(key: string, value: string) {
    if (typeof localStorage !== 'undefined') {
     localStorage.setItem(key, value);
    }
  }

  public getData(key: string):any {
    if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key)
    }
  }
  public removeData(key: string):void {
    if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
    }
  }

  public clearData():void {
    if (typeof localStorage !== 'undefined') {
    localStorage.clear();
    }
  }
}
