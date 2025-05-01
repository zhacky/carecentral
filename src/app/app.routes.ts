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
import { PatientDetailsComponent } from './shared/components/patient-details/patient-details.component';
import { EditDoctorComponent } from './shared/components/edit-doctor/edit-doctor.component';
import { EditPatientComponent } from './shared/components/patient-edit/patient-edit.component';
import { DoctorDetailsComponent } from './shared/components/doctor-details/doctor-details.component';
import { RoomDetailsComponent } from './shared/components/room-details/room-details.component';
import { RoomAssignDetailsComponent } from './shared/components/room-assign-details/room-assign-details.component';
import {EditRoomComponent} from './shared/components/edit-room/edit-room.component';
import { UnauthorizedComponent } from './core/auth/login/unauthorized.component';
import { RoleGuard } from './core/auth/login/role.guard';
import { LoginGuard } from './core/auth/login/login.guard';
import {BillingComponent} from './features/billing/billing.component';
import {PhilhealthComponent} from './features/philhealth/philhealth.component';
import {AddPhilhealthComponent} from './shared/components/add-philhealth/add-philhealth.component';
import {EditPhilhealthComponent} from './shared/components/edit-philhealth/edit-philhealth.component';
import { SignUpComponent } from './core/auth/sign-up/sign-up.component';
import { SuccessMessageComponent } from './shared/components/success-card/success-message/success-message.component';
import { FormSubmissionGuard } from './core/auth/login/form.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  { 
    path: 'sign-up', 
   component: SignUpComponent 
  },

   { 
    path: 'success-message', 
    component: SuccessMessageComponent, 
    canActivate: [FormSubmissionGuard] 
   },

  {
    path: 'common',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'billing', component: BillingComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_PATIENT'] } },
      { path: 'profile', component: ProfileComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_NURSE', 'ROLE_PATIENT'] } },
      { path: 'appointment', component: AppointmentComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'doctor', component: DoctorComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'] } },
      { path: 'patient', component: PatientInformationComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE', 'ROLE_DOCTOR'] } },
      { path: 'report', component: ReportComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] } },
      { path: 'settings', component: SettingsComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'accounts', component: AccountsManagementComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'accounts/register', component: RegisterComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'inventory', component: InventoryComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'patient/add', component: AddPatientDialogComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] } },
      { path: 'patient/details/:id', component: PatientDetailsComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_NURSE'] } },
      { path: 'patient/edit/:id', component: EditPatientComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] } },
      { path: 'inventory/add', component: AddInventoryComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'inventory/edit/:id', component: EditInventoryComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'room', component: RoomComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] } },
      { path: 'room/add', component: AddRoomComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'room/details/:id', component: RoomDetailsComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] } },
      { path: 'room/edit/:id', component: EditRoomComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'roomAssign', component: RoomAssignComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] } },
      { path: 'roomAssign/add', component: AddRoomAssignComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'roomAssign/details', component: RoomAssignDetailsComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'doctor/add', component: AddDoctorComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'doctor/details/:id', component: DoctorDetailsComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'doctor/edit/:id', component: EditDoctorComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'philhealth', component: PhilhealthComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'philhealth/add', component: AddPhilhealthComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'philhealth/edit/:id', component: EditPhilhealthComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'unauthorized', component: UnauthorizedComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
