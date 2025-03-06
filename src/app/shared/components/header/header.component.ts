import { Component, EventEmitter, Output } from '@angular/core';
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
export class HeaderComponent {
  // collapsed = signal(false);
  // sidenavWidth = computed(() => (this.collapsed() ? '60px' : '250px'));
  @Output() toggleSidenav = new EventEmitter<void>(); // Create event emitter
  activeRoute: string = '';

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
