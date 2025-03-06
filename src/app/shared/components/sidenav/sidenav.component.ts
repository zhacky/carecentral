import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderComponent } from '../header/header.component';

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
  ],
  standalone: true,
})
export class SidenavComponent {
  showFiller = false;

  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));

  // sideNavCollapsed = signal(false);
  // @Input() set collapse(val: boolean) {
  //   this.sideNavCollapsed.set(val);
  // }
  sideNavCollapsed = signal(false);
  logoPicSize = computed(() => (this.collapsed() ? '40px' : '150px'));

  menuItems = signal<MenuItem[]>([
    {
      icon: 'assets/Icons/icon_dashboard.svg',
      label: 'Dashboard',
      route: 'dashboard',
    },
    // {
    //   icon: 'assets/Icons/icon_dashboard.svg',
    //   label: 'Profile',
    //   route: 'profile',
    // },
    {
      icon: 'assets/Icons/icon_appointment.svg',
      label: 'Appointments',
      route: 'appointment',
    },
    {
      icon: 'assets/Icons/icon_doctor.svg',
      label: 'Doctor',
      route: 'doctor',
    },
    {
      icon: 'assets/Icons/icon_patient.svg',
      label: 'Patients',
      route: 'patient',
    },
    {
      icon: 'assets/Icons/icon_report.svg',
      label: 'Reports',
      route: 'report',
    },
    {
      icon: 'assets/Icons/icon_settings.svg',
      label: 'Settings',
      route: 'settings',
    },

    {
      icon: 'assets/Icons/icon_logout.svg',
      label: 'Logout',
      route: '',
    },
  ]);
}
