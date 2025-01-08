import { Routes } from '@angular/router';
import {LoginComponent} from './core/auth/login/login.component';
import {RegisterComponent} from './core/auth/register/register.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {ProfileComponent} from './features/profile/profile.component';
import { Sidenav } from './shared/components/sidenav/sidenav.component';
import { PatientInformationComponent } from './features/patient-information/patient-information.component';
import { AccountsManagementComponent } from './features/accounts-management/accounts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'common',
    component: Sidenav,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'accounts', component: AccountsManagementComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patient',component: PatientInformationComponent }
    ],
  },

];
