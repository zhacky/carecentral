import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditPermissionsDialogComponent } from '../../shared/components/edit-permissions-dialog/edit-permissions-dialog.component';

@Component({
  selector: 'app-settings',
  imports: [NgForOf, CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  roles: { name: string }[] = [];
  newRoleName = '';
  
  constructor(
    private authService: AuthService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

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

  editPermissions(roleName: string): void {
    const dialogRef = this.dialog.open(EditPermissionsDialogComponent, {
      width: '500px',
      data: { roleName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchRoles(); // Refresh the roles list
      }
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
        this.snackBar.open('Failed to add role!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
