import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { CompareComponent } from './compare/compare.component';
import { SaleEntryComponent } from './sale/saleEntry.component';
import { AuthGuard } from './user/auth-guard.service';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'compare', canActivate: [AuthGuard], component: CompareComponent },
  { path: 'saleEntry', canActivate: [AuthGuard], component: SaleEntryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
