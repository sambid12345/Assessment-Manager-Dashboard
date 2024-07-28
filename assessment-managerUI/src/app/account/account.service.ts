import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:3000/auth/'; // Replace with your API's base URL

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, loginData)
      .pipe(
        tap((response: any) => {
            console.log('login response', response);
         

          localStorage.setItem('user', JSON.stringify(response.userInfo));
          
        })
      );
  }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}signup`, signupData);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
