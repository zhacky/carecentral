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
import { AddInventoryComponent } from './features/inventory/add-inventory/add-inventory.component';
import { EditInventoryComponent } from './features/inventory/edit-inventory/edit-inventory.component';
import { AddDoctorComponent } from './features/doctor/add-doctor/add-doctor.component';
import { AuthGuard } from './core/auth/login/route.guard';
import { RoomComponent } from './features/room/room.component';
import { AddRoomComponent } from './features/room/add-room/add-room.component';
import { RoomAssignComponent } from './features/room-assign/room-assign.component';
import { AddRoomAssignComponent } from './features/room-assign/add-room-assign/add-room-assign.component';
import { PatientDetailsComponent } from './features/patient-information/patient-details/patient-details.component';
import { EditDoctorComponent } from './features/doctor/edit-doctor/edit-doctor.component';
import { EditPatientComponent } from './features/patient-information/patient-edit/patient-edit.component';
import { DoctorDetailsComponent } from './features/doctor/doctor-details/doctor-details.component';
import { RoomDetailsComponent } from './features/room/room-details/room-details.component';
import { RoomAssignDetailsComponent } from './features/room-assign/room-assign-details/room-assign-details.component';
import { EditRoomComponent } from './features/room/edit-room/edit-room.component';
import { UnauthorizedComponent } from './core/auth/login/unauthorized.component';
import { RoleGuard } from './core/auth/login/role.guard';
import { BillingComponent } from './features/billing/billing.component';
import { PhilhealthComponent } from './features/philhealth/philhealth.component';
import { PhilhealthDetailsComponent } from './features/philhealth/philhealth-details/philhealth-details.component';
import { LoginGuard } from './core/auth/login/login.guard';
import { AddPhilhealthComponent } from './features/philhealth/add-philhealth/add-philhealth.component';
import { EditPhilhealthComponent } from './features/philhealth/edit-philhealth/edit-philhealth.component';
import { SignUpComponent } from './core/auth/sign-up/sign-up.component';
import { SuccessMessageComponent } from './shared/components/success-card/success-message/success-message.component';
import { FormSubmissionGuard } from './core/auth/login/form.guard';
import { EditAccountComponent } from './features/accounts-management/edit-account/edit-account.component';
import { EditRoomAssignComponent } from './features/room-assign/edit-room-assign/edit-room-assign.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { BillingDetailsComponent } from './features/billing/billing-details/billing-details.component';
import { BillingEditComponent } from './features/billing/billing-edit/billing-edit.component';
import { BillingAddComponent } from './features/billing/billing-add/billing-add.component';
import { PharmacyComponent } from './features/pharmacy/pharmacy.component';
import {LaboratoryComponent} from './features/laboratory/laboratory.component';
import {AddLaboratoryComponent} from './features/laboratory/add-laboratory/add-laboratory.component';
import {PatientRecordComponent} from './features/patient-record/patient-record.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },

  {
    path: 'success-message',
    component: SuccessMessageComponent,
    canActivate: [FormSubmissionGuard],
  },

  {
    path: 'common',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'billing',
        component: BillingComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_PATIENT'] },
      },
      {
        path: 'billing/details/:id',
        component: BillingDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_PATIENT'] },
      },
      {
        path: 'billing/edit/:id',
        component: BillingEditComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'billing/add',
        component: BillingAddComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_NURSE', 'ROLE_PATIENT'],
        },
      },
      {
        path: 'appointment',
        component: AppointmentComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'doctor',
        component: DoctorComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'] },
      },
      {
        path: 'patient',
        component: PatientInformationComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE', 'ROLE_DOCTOR'] },
      },
      {
        path: 'patientRecords',
        component: PatientRecordComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE', 'ROLE_DOCTOR'] },
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'accounts',
        component: AccountsManagementComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'accounts/register',
        component: RegisterComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'laboratory',
        component: LaboratoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'pharmacy',
        component: PharmacyComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'patient/add',
        component: AddPatientDialogComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] },
      },
      {
        path: 'patient/details/:id',
        component: PatientDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_NURSE'] },
      },
      {
        path: 'patient/edit/:id',
        component: EditPatientComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] },
      },
      {
        path: 'inventory/add',
        component: AddInventoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'inventory/edit/:id',
        component: EditInventoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'room',
        component: RoomComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] },
      },
      {
        path: 'room/add',
        component: AddRoomComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'room/details/:id',
        component: RoomDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] },
      },
      {
        path: 'room/edit/:id',
        component: EditRoomComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'roomAssign',
        component: RoomAssignComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_NURSE'] },
      },
      {
        path: 'roomAssign/add',
        component: AddRoomAssignComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'roomAssign/edit/:id',
        component: EditRoomAssignComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'roomAssign/details/:id',
        component: RoomAssignDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'doctor/add',
        component: AddDoctorComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'doctor/details/:id',
        component: DoctorDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'doctor/edit/:id',
        component: EditDoctorComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'laboratory/add',
        component: AddLaboratoryComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'philhealth',
        component: PhilhealthComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'philhealth/details/:id',
        component: PhilhealthDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'philhealth/add',
        component: AddPhilhealthComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_IT Administrator'] },
      },
      {
        path: 'philhealth/edit/:id',
        component: EditPhilhealthComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_IT Administrator'] },
      },
      {
        path: 'accounts/edit/:id',
        component: EditAccountComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_IT Administrator'] },
      },
      { path: 'unauthorized', component: UnauthorizedComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
