import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './account/auth.guard';
import { RoleGuard } from './account/role.guard';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },

  {
    path: 'account', 
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },

  { 
    path: 'questions', 
    loadChildren: () => import('./question/question.module').then(m => m.QuestionModule) ,
    canActivate: [AuthGuard, RoleGuard]
  },

  {
    path: 'candidates',
    loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
