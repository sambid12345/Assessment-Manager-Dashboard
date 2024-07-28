import { Component, OnInit } from '@angular/core';
import { Candidate } from '../util/candidate.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit{
  candidate!: Candidate;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCandidateDetails(id);
      }
    });
  }

  loadCandidateDetails(id: string): void {
    this.candidateService.getCandidateById(id).subscribe({
      next: (data: Candidate)=>{this.candidate = data;},
      error: (error: any)=>{
        console.error('Error fetching candidate details', error);
       
        this.router.navigate(['/candidates']);
      }
    })
   
  }
  logout(): void {
    if(confirm('Are you sure you want to delete this question?')){
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
}
