import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let status: boolean;

      const loggedInUser = localStorage.getItem('user');
      if(loggedInUser){
        const user = JSON.parse(loggedInUser);
        if(user && user.userRole === 'Admin'){
          status = true;
        }else{
          status = false;
          alert('Question Module Not Accessible to Delivery Admin Role')
          this.router.navigate(['/account']);
        }
      }else{
        status = false;
        this.router.navigate(['/account']);
      }
    return status;
  }
}
