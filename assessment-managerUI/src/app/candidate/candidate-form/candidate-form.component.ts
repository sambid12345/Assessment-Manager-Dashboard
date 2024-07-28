import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../util/candidate.model';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit{
  candidateForm!: FormGroup;
  isEditMode: boolean = false;
  candidateId?: string;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
   
  }

  ngOnInit(): void {
      this.initiateCandidateFrm();

      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.candidateId = id;
          this.loadCandidateData(id);
        }
      });
  }
  initiateCandidateFrm(){
    this.candidateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
     
    });
  }

  loadCandidateData(id: string): void {
    this.candidateService.getCandidateById(id).subscribe({
      next: (candidate: Candidate) => {this.candidateForm.patchValue(candidate)},
      error:(error: any)=>{console.error('Error loading candidate data', error)}
    })
   
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const candidateData: Candidate = this.candidateForm.value;
      if (this.isEditMode && this.candidateId) {
        this.candidateService.updateCandidate(this.candidateId, candidateData).subscribe(
          () => this.router.navigate(['/candidates']),
          error => console.error('Error updating candidate', error)
        );
      } else {
        this.candidateService.createCandidate(candidateData).subscribe(
          () => this.router.navigate(['/candidates']),
          error => console.error('Error creating candidate', error)
        );
      }
    }
  }
}
