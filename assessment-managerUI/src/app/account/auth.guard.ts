import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let status: boolean
      const loggedInUser = localStorage.getItem('user');
      console.log('loggedinUser', loggedInUser);
      if(loggedInUser){
        status = true;
      }else{
        // User is not logged in, redirect to login page
        status = false;
        this.router.navigate(['/account']);
      }
     
    return status;
  }
  
}
