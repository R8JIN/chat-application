import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timestamp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timestamp.component.html',
  styleUrl: './timestamp.component.css'
})
export class TimestampComponent {

  @Input() messageTimeStamp!: string ;
  messageTimeStampList: any= [];
  prevMessageTimeStamp:string = '';
  currentMessageTimeStamp: string = '';
  date: string = '';



  ngOnChanges(changes: SimpleChanges): void {

    if (changes['messageTimeStamp']) {
      this.date = Date.now().toString();
      this.prevMessageTimeStamp = this.currentMessageTimeStamp;
      this.currentMessageTimeStamp = this.messageTimeStamp;
      this.messageTimeStampList.push(this.currentMessageTimeStamp);
      console.log('Time Stamp Changed', this.prevMessageTimeStamp);
    }
  }

}
