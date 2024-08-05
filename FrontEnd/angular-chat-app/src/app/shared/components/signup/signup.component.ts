import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private toastr: ToastrService, 
              private authService:AuthService,
              private router: Router){

  }

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  

  signup(){
    if(this.signupForm.valid){

      if(this.signupForm.value.password !== this.signupForm.value.confirmPassword){

        console.error("Password does not match.")
        this.showError("Confirm Password do not match with the Password");
        
      }
      else{
        this.authService.signup(
          this.signupForm.value.username, 
          this.signupForm.value.email, 
          this.signupForm.value.password).subscribe(response=>
        {
          console.log("The response is ", response.message);
          this.router.navigate(["/"]);
          this.showSuccess(response.message);
        },
        error => {
          console.log("Error", error);
          this.showError(error);
        });
      }
    }
    else{

      console.log("Invalid Form");
      this.showError("Please fill the sign up form properly.")
      
    }
  }

  showSuccess(msg:string) {
    this.toastr.success(msg);
  }

  showError(msg:string){
    this.toastr.error(msg);
  }

}
