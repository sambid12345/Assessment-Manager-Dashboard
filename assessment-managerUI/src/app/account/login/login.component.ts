import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  loginForm!: FormGroup;
  constructor( private router:Router, private fb: FormBuilder, private accountService: AccountService){

  }

  ngOnInit(): void {
      this.initiateLoginForm();
  }
  initiateLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any)=>{
          console.log('login successful');
          alert('login successful');
          this.router.navigate(['dashboard']);
        },
        error: (error: any)=>{
          console.log('login failed');
          alert('login failed');
        }
      })
      
    }
  }
  navigateTo(path:string){
    this.router.navigate([path])
  }
}
