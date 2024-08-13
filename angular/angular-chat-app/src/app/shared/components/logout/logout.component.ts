import { Component, inject } from '@angular/core';
import { LocalService } from '../../../core/local.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebSocketService } from '../../../core/web-socket.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  localService = inject(LocalService)

  constructor(private toastr: ToastrService, 
              private router:Router,
              private webSocketService: WebSocketService){

  }
  
  logout(){
    this.localService.clearData();
    this.webSocketService.close();
    setTimeout(()=> this.router.navigate(["/"]), 2000);
    this.router.navigate(["/"])
    this.showSuccess("Logged Out");
 
  }

  showSuccess(msg:string){
    this.toastr.success(msg);
  }
}
