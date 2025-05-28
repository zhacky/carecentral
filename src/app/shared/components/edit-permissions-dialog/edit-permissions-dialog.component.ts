import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-edit-permissions-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  template: `
    <h2 mat-dialog-title>Edit Permissions for {{ data.roleName }}</h2>
    <mat-dialog-content>
      <div class="permissions-list">
        <mat-checkbox
          *ngFor="let permission of availablePermissions"
          [(ngModel)]="selectedPermissions[permission]"
          class="permission-checkbox">
          {{ permission }}
        </mat-checkbox>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button 
        mat-raised-button 
        color="primary" 
        (click)="savePermissions()"
        [disabled]="isLoading">
        <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
        <span *ngIf="!isLoading">Save</span>
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .permissions-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px 0;
    }
    .permission-checkbox {
      margin: 5px 0;
    }
    mat-dialog-actions {
      padding: 16px 0;
    }
  `]
})
export class EditPermissionsDialogComponent implements OnInit {
  availablePermissions: string[] = [
    'VIEW_PATIENTS',
    'EDIT_PATIENTS',
    'DELETE_PATIENTS',
    'VIEW_DOCTORS',
    'EDIT_DOCTORS',
    'DELETE_DOCTORS',
    'VIEW_INVENTORY',
    'EDIT_INVENTORY',
    'DELETE_INVENTORY',
    'VIEW_ROOMS',
    'EDIT_ROOMS',
    'DELETE_ROOMS',
    'MANAGE_USERS',
    'MANAGE_ROLES'
  ];
  
  selectedPermissions: { [key: string]: boolean } = {};
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<EditPermissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roleName: string },
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCurrentPermissions();
  }

  loadCurrentPermissions() {
    this.isLoading = true;
    this.authService.getRolePermissions(this.data.roleName).subscribe({
      next: (permissions) => {
        this.availablePermissions.forEach(permission => {
          this.selectedPermissions[permission] = permissions.includes(permission);
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading permissions:', error);
        this.snackBar.open('Error loading permissions', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }

  savePermissions() {
    this.isLoading = true;
    const selectedPermissionsList = Object.entries(this.selectedPermissions)
      .filter(([_, isSelected]) => isSelected)
      .map(([permission]) => permission);

    this.authService.updateRolePermissions(this.data.roleName, selectedPermissionsList).subscribe({
      next: () => {
        this.snackBar.open('Permissions updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating permissions:', error);
        this.snackBar.open('Error updating permissions', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }
} 