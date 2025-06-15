import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Router, RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from '../header/header.component';
import {AuthService} from '../../../core/services/auth.service';

export interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrl: 'sidenav.component.css',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    HeaderComponent
  ],
  standalone: true,
})
export class SidenavComponent {
  currentUserRoles: string[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '60px' : '230px'));

  expandedItems = signal<Record<string, boolean>>({});

  toggleExpand(label: string) {
    // const current = this.expandedItems();
    this.expandedItems.update((items) => ({
      ...items,
      [label]: !items[label],
    }));
  }
  sideNavCollapsed = signal(false);
  logoPicSize = computed(() => (this.collapsed() ? '40px' : '150px'));

  // Detect if the current route is 'dashboard'
  isDashboardRoute(): boolean {
    return this.router.url === '/common/dashboard';
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'assets/Icons/icon_dashboard.svg',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'assets/Icons/icon_account.svg',
      label: 'Accounts',
      route: 'accounts',
    },
    {
      icon: 'assets/Icons/icon_account.svg',
      label: 'Billing',
      route: 'billing',
    },
    {
      icon: 'assets/Icons/icon_doctor.svg',
      label: 'Doctors',
      route: 'doctor',
    },
    {
      icon: 'assets/Icons/icon_patient.svg',
      label: 'Patients',
      route: 'patient',
    },
    {
      icon: 'assets/Icons/icon_room.svg',
      label: 'Rooms',
      children: [
        {
          icon: 'assets/Icons/icon_dot.svg',
          label: 'Room List',
          route: 'room',
        },
        {
          icon: 'assets/Icons/icon_dot.svg',
          label: 'Assign Room',
          route: 'roomAssign',
        },
      ],
    },
    {
      icon: 'assets/Icons/icon_philhealth.svg',
      label: 'Philhealth',
      route: 'philhealth',
    },
    {
      icon: 'assets/Icons/icon_inventory.svg',
      label: 'Inventory',
      route: 'inventory',
    },
    {
      icon: 'assets/Icons/icon_inventory.svg',
      label: 'Pharmacy',
      route: 'pharmacy',
    },
    {
      icon: 'assets/Icons/icon_settings.svg',
      label: 'Settings',
      route: 'settings',
    },
  ]);
}
