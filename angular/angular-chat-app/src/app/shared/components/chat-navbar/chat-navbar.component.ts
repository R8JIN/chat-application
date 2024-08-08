import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ChatMessageService } from '../../../core/chat-message.service';
import { ClientService } from '../../../core/client.service';
import { error } from 'console';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-chat-navbar',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './chat-navbar.component.html',
  styleUrl: './chat-navbar.component.css'
})
export class ChatNavbarComponent {
  
  chatMessageService = inject(ChatMessageService);
  clientService = inject(ClientService);

  text: string = '';
  targetId: string = '';
  clientId: string =  '';
  targetFirstName: string = '';
  selectedName: string = '';

  filteredClientList: any = []
  clientList: any = [];
  chatMessageList: any = [];

  @Output() messageEvent = new EventEmitter<any>();

  constructor() {
    this.clientService.getClients().subscribe(response=>{
      this.clientList = response.data;
      this.filteredClientList = this.clientList;
      console.log("The clientList is ", this.clientList);
    },
    error=>{
      console.error(error);
    }
    )
   }

  sendMessage(targetClient:any) {
    this.selectedName = targetClient.firstName;
    this.messageEvent.emit(targetClient);

    // const indexToRemove = this.filteredClientList.indexOf(targetClient);

    // if (indexToRemove !== -1) {
    //   this.filteredClientList.splice(indexToRemove, 1);
    // }
    // this.filteredClientList.unshift(targetClient);
  }


  filterResults(text: string) {
    if (!text) {
      this.filteredClientList = this.clientList;
      return;
    }
    this.filteredClientList = this.filteredClientList = this.clientList.filter((client: any) =>
      (client?.firstName.toLowerCase() + ' ' + client?.lastName.toLowerCase()).includes(text.toLowerCase())
    );
  }

  change(event:any){
    if (!event.target.value) {
      this.filteredClientList = this.clientList;
      return;
    }
    this.filteredClientList = this.filteredClientList = this.clientList.filter((client: any) =>
      (client?.firstName.toLowerCase() + ' ' + client?.lastName.toLowerCase()).includes(event.target.value.toLowerCase())
    );
  }

}
