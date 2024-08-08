import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-receive-msg',
  standalone: true,
  imports: [],
  templateUrl: './receive-msg.component.html',
  styleUrl: './receive-msg.component.css'
})
export class ReceiveMsgComponent {
  @Input() message: string = '';

}
