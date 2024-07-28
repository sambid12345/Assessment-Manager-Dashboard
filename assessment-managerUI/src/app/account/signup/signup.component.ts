import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  roles: string[] = ['Admin', 'DeliveryAdmin'];
  constructor(private router: Router, private fb:FormBuilder, 
    private accountService: AccountService){

  }
  ngOnInit(): void {
      this.initiateSignupForm();
  }
  initiateSignupForm(){
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }
  onSignup(): void {
    if (this.signupForm.valid) {
      console.log('Signup data:', this.signupForm.value);
      this.accountService.signup(this.signupForm.value).subscribe({
        next: (response: any)=>{
          alert('Account Creation Successful');
          this.router.navigate(['account','login']);
        },
        error: (err)=>{
          alert('Account Creation Failed');
        }
      });
    }
  }
  navigateTo(path:string){
    this.router.navigate([path])
  }
}
