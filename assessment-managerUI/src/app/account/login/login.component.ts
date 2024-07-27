import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  loginForm!: FormGroup;
  constructor( private router:Router, private fb: FormBuilder){

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
      
      
    }
  }
  navigateTo(path:string){
    this.router.navigate([path])
  }
}
