import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';

const routes: Routes = [
  { path: '', component: CandidateListComponent },
  { path: 'create', component: CandidateFormComponent },
  { path: 'edit/:id', component: CandidateFormComponent },
  { path: 'detail/:id', component: CandidateDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
