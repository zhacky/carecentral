import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {
  EditPermissionsDialogComponent
} from '../../shared/components/edit-permissions-dialog/edit-permissions-dialog.component';
import {UserRolesSettingsComponent} from './cards/user-roles-settings/user-roles-settings.component';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, UserRolesSettingsComponent],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  roles: { name: string }[] = [];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

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

  addRole(newRoleName: string): void {
    if (!newRoleName.trim()) {
      alert('Role name cannot be empty!');
      return;
    }

    const newRole = { name: newRoleName.trim() };
    this.roles.push(newRole);

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
