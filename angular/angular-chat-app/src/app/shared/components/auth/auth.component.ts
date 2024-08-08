import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { LocalService } from '../../../core/local.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

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
  firstName: string = '';
  lastName: string = '';
  
  not_login = true;
  user_login = false;
  // toastr: any;

  constructor(private toastr: ToastrService, private router: Router){
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
        this.localService.saveData("firstName", String(response.firstName));
        this.localService.saveData("lastName", String(response.lastName));
        this.localService.saveData("email", String(response.email));
        this.localService.saveData("id", String(response.id));
        
        this.not_login = false;
        this.username = this.localService.getData("username");
        this.loginForm.reset(); 
        this.router.navigate(["/home"]);

        console.log("success");
        this.showSuccess("Login Successful");
    
      },
      error => {
        
        if(error.status === 400){
          console.error('Error submitting application', typeof(error.status));  
          this.showError('Bad Credentials. Please enter valid username or password.');
        }
        else{
          this.showError("You are unauthorized to access the page");
        }

      }
      ); 
    }
    else{
      console.log("Error");
      this.showError("Please fill up the login form.");
    }

  }

  logout(){
    this.localService.clearData();
    this.not_login=true;
    this.username = this.localService.getData("username") || "";
    this.router.navigate(["/auth"]);
    // this.showError("See you !!!");
 
  }

  showSuccess(msg:string) {
    this.toastr.success(msg);
  }

  showError(msg:string){
    this.toastr.error(msg);
  }
}
