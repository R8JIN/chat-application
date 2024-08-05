import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { LocalService } from '../../../core/local.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {


  authService = inject(AuthService);
  localService = inject(LocalService);
  username = '';
  not_login = true;
  user_login = false;
  // toastr: any;

  constructor( private router: Router){
    this.username = this.localService.getData("username") || "";
    console.log("From local storage ", this.username);

    if(this.username){
      this.not_login = false;
      this.user_login = true;
      console.log(this.not_login);
      this.router.navigate(["/home"])
    }
    console.log(this.username);
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login(){

    if(this.loginForm.valid){

      console.log("The username is ", this.loginForm.value.username);
      this.authService.login(this.loginForm.value.username, 
        this.loginForm.value.password).subscribe(
      response => {

        
        console.log("The response is ", response.token );
        
        this.localService.saveData("token", String(response.token));
        this.localService.saveData("username", String(response.username));
        this.localService.saveData("email", String(response.email));
        this.localService.saveData("id", String(response.id));
        
        this.not_login = false;
        this.username = this.localService.getData("username");
        this.loginForm.reset(); 
        this.router.navigate(["/home"]);

        // this.showSuccess("Login Successful");
    
      },
      error => {
        console.error('Error submitting application', error);  
        // this.showError(error);
      }
      ); 
    }
    else{
      console.log("Error");
      // this.showError("Please fill the user form");
    }

  }

  logout(){
    this.localService.clearData();
    this.not_login=true;
    this.username = this.localService.getData("username") || "";
    this.router.navigate(["/"]);
    // this.showError("See you !!!");
 
  }

}
