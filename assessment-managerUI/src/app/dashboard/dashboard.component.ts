import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  accountDetails!: any

  constructor(private router: Router) {
    // Fetch account details from localStorage or a service
    let loggedInUser= localStorage.getItem('user');
    
    if(loggedInUser){
      this.accountDetails = JSON.parse(loggedInUser);
      console.log('account details', this.accountDetails);
    }
  }

  ngOnInit(): void {
   
   
  }


  logout(): void {
    if(confirm('Are you sure you want to delete this question?')){
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
}
