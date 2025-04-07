import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderComponent } from '../header/header.component';
import { PatientchartComponent } from '../../../features/dashboard/patientchart/patientchart.component';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'sidenav-app',
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.css',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    MatToolbar,
    HeaderComponent,
    PatientchartComponent,
  ],
  standalone: true,
})
export class SidenavComponent {
  constructor(private router: Router) {}

  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '60px' : '200px'));

  // Detect if the current route is 'dashboard'
  isDashboardRoute(): boolean {
    return this.router.url === '/common/dashboard';
  }

  doctors = signal([
    { id: 1, name: 'Dr. Smith', status: 'present' },
    { id: 2, name: 'Dr. Johnson', status: 'absent' },
    { id: 3, name: 'Dr. Williams', status: 'present' },
    { id: 4, name: 'Dr. Brown', status: 'absent' },
    { id: 5, name: 'Dr. Garcia', status: 'present' },
    { id: 6, name: 'Dr. Martinez', status: 'absent' },
    { id: 7, name: 'Dr. Anderson', status: 'present' },
    { id: 8, name: 'Dr. Thomas', status: 'absent' },
    { id: 9, name: 'Dr. Clark', status: 'present' },
    { id: 10, name: 'Dr. Walker', status: 'absent' },
    { id: 11, name: 'Dr. Lewis', status: 'present' },
    { id: 12, name: 'Dr. Lee', status: 'absent' },
    { id: 13, name: 'Dr. Harris', status: 'present' },
    { id: 14, name: 'Dr. Nelson', status: 'absent' },
    { id: 15, name: 'Dr. Carter', status: 'present' },
    { id: 16, name: 'Dr. Mitchell', status: 'absent' },
    { id: 17, name: 'Dr. Perez', status: 'present' },
    { id: 18, name: 'Dr. Robinson', status: 'absent' },
    { id: 19, name: 'Dr. Lee', status: 'present' },
    { id: 20, name: 'Dr. Young', status: 'absent' },
    { id: 21, name: 'Dr. King', status: 'present' },
    { id: 22, name: 'Dr. Scott', status: 'absent' },
  ]);

  menuItems = signal<MenuItem[]>([
    {
      icon: 'assets/Icons/icon_dashboard.svg',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'assets/Icons/icon_dashboard.svg',
      label: 'Profile',
      route: 'profile',
    },
    {
      icon: 'assets/Icons/icon_dashboard.svg',
      label: 'Accounts',
      route: 'accounts',
    },
    {
      icon: 'assets/Icons/icon_appointment.svg',
      label: 'Appointments',
      route: 'appointment',
    },
    { icon: 'assets/Icons/icon_doctor.svg', label: 'Doctor', route: 'doctor' },
    {
      icon: 'assets/Icons/icon_patient.svg',
      label: 'Patients',
      route: 'patient',
    },
    {
      icon: 'assets/Icons/icon_report.svg',
      label: 'Reports',
      route: 'inventory',
    },
    {
      icon: 'assets/Icons/icon_settings.svg',
      label: 'Settings',
      route: 'settings',
    },
    { icon: 'assets/Icons/icon_logout.svg', label: 'Logout', route: '' },
  ]);
}
