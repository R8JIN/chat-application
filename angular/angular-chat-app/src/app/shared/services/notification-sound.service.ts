import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationSoundService {

  private audio = new Audio();

  constructor() {
    this.audio.src = 'assets/sound/notification.mp3';
    this.audio.load();
  }

  playSound(): void {
    this.audio.play();
  }

}
