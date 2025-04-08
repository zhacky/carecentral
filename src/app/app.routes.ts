import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { PatientInformationComponent } from './features/patient-information/patient-information.component';
import { AccountsManagementComponent } from './features/accounts-management/accounts.component';
import { AppointmentComponent } from './features/appointment/appointment.component';
import { DoctorComponent } from './features/doctor/doctor.component';
import { SettingsComponent } from './features/settings/settings.component';
import { ReportComponent } from './features/report/report.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { AddPatientDialogComponent } from './shared/components/patient-dialog/patient-dialog.component';
import { AddInventoryComponent } from './shared/components/add-inventory/add-inventory.component';
import { EditInventoryComponent } from './shared/components/edit-inventory/edit-inventory.component';
import { AddDoctorComponent } from './shared/components/add-doctor/add-doctor.component';
import { AuthGuard } from './core/auth/login/route.guard';
import { RoomComponent } from './features/room/room.component';
import { AddRoomComponent } from './shared/components/add-room/add-room.component';
import { RoomAssignComponent } from './features/room-assign/room-assign.component';
import { AddRoomAssignComponent } from './shared/components/add-room-assign/add-room-assign.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'common',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'patient', component: PatientInformationComponent },
      { path: 'report', component: ReportComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'accounts', component: AccountsManagementComponent },
      { path: 'accounts/register', component: RegisterComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'patient/add', component: AddPatientDialogComponent },
      { path: 'inventory/add', component: AddInventoryComponent },
      { path: 'inventory/edit/:id', component: EditInventoryComponent },
      { path: 'room', component: RoomComponent },
      { path: 'room/add', component: AddRoomComponent },
      { path: 'roomAssign', component: RoomAssignComponent },
      { path: 'roomAssign/add', component: AddRoomAssignComponent },
      { path: 'doctor/add', component: AddDoctorComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
