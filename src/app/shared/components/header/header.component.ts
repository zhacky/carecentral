import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatToolbar, NgIf],
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  // collapsed = signal(false);
  // sidenavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));
  @Output() toggleSidenav = new EventEmitter<void>(); // Create event emitter
  activeRoute: string = '';
  currentTime: string = '';

  isProfileMenuOpen = false;
  @ViewChild('profileMenuContainer') profileMenuContainer!: ElementRef;

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  navigateTo(path: string) {
    this.isProfileMenuOpen = false; // Auto hide the menu
    this.router.navigate([path]);
  }

  logout() {
    this.isProfileMenuOpen = false; // Auto hide the menu
    // add your logout logic here
    this.router.navigate(['/auth/login']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.isProfileMenuOpen &&
      !this.profileMenuContainer.nativeElement.contains(event.target)
    ) {
      this.isProfileMenuOpen = false;
    }
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  onLogout() {
    console.log('Logout initiated.');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']).then(() => {
      console.log('User logged out and redirected to login page.');
    }).catch((error) => {
      console.error('Logout redirection failed:', error);
    });
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = this.router.url; // Get full URL
        console.log('Active Route:', this.activeRoute); // Debugging
      }
    });
  }

  onToggle() {
    this.toggleSidenav.emit(); // Emit event when button is clicked
  }
}
