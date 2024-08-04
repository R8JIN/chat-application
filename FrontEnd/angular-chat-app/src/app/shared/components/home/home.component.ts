import { Component, Input } from '@angular/core';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { ChatNavbarComponent } from '../chat-navbar/chat-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatBoxComponent,ChatNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  targetId: string= '';

  addItem(newTargetId:string){
    this.targetId = newTargetId;
    console.log("The home targetId is", this.targetId);
  }

}
