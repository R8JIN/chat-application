import { Component, inject } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { LocalService } from '../../../core/local.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LogoutComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  localService = inject(LocalService)
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  constructor(){
    this.username = this.localService.getData("username");
    this.firstName = this.localService.getData("firstName");
    this.lastName = this.localService.getData("lastName");
    
  } 
}
