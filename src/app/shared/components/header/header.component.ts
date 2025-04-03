import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  onLogout() {
    // Add logout functionality here
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
