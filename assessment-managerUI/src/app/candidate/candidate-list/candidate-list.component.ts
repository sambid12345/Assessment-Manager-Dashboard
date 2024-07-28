import { Component, ViewChild } from '@angular/core';
import { Candidate } from '../util/candidate.model';
import { CandidateService } from '../candidate.service';
import { Router } from '@angular/router';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  candidates: Candidate[] = [];
  displayedColumns: string[] = ['_id', 'createdAt' ,'name', 'email', 'phone'];
  dataSource : any
  constructor(private candidateService: CandidateService, private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.loadCandidates();
  }


  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe(
      (data: Candidate[]) => {
        this.candidates = data;

       
        this.dataSource = new MatTableDataSource(this.candidates);
        console.log('data source', this.dataSource);
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error loading candidates', error);
      }
    );
  }

  deleteCandidate(id: string): void {

    if(id && confirm('Are you sure you want to delete this question?')){
      this.candidateService.deleteCandidate(id).subscribe({
        next: ()=>{this.candidates = this.candidates.filter(candidate => candidate._id !== id);},
        error: (error: any)=>{console.error('Error deleting candidate', error);}
      })
    }
  }

  navigateTo(path:string){
    this.router.navigate([path]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
