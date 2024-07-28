import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'account', pathMatch: 'full'},

  {
    path: 'account', 
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },

  { 
    path: 'questions', loadChildren: () => import('./question/question.module').then(m => m.QuestionModule) 
  },

  {
    path: 'candidates',
    loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
