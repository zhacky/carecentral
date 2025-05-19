import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  imports: [NgForOf, CommonModule, FormsModule  ],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  roles: { name: string }[] = [];
  newRoleName = '';
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}
  

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  ngOnInit(): void {
    this.fetchRoles(); 
  }

  fetchRoles(): void {
    this.authService.getRoles().subscribe({
      next: (roles) => { 
        this.roles = roles.map((role: any) => ({
          name: role.name, 
        }));
      },
      error: (err) => {
        console.error('Failed to fetch roles:', err); 
      },
    });
  }

  addRole(): void {
    if (!this.newRoleName.trim()) {
      alert('Role name cannot be empty!');
      return;
    }

    const newRole = { name: this.newRoleName.trim() };
    this.roles.push(newRole); 
    this.newRoleName = ''; 

 
    this.authService.addRole(newRole).subscribe({
      next: () => {
        this.snackBar.open('Role added successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-success'], 
        });
      },
      error: (err) => {
        console.error('Failed to add role:', err);
        this.snackBar.open('Role added successfully!', 'Close', {
          duration: 3000, 
          panelClass: ['snackbar-error'], 
        });
      },
    });
  }
}
