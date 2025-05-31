import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Change Password</h2>
        
        <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <mat-form-field class="w-full">
            <mat-label>Current Password</mat-label>
            <input matInput type="password" formControlName="currentPassword" required>
            <mat-error *ngIf="changePasswordForm.get('currentPassword')?.errors?.['required']">
              Current password is required
            </mat-error>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>New Password</mat-label>
            <input matInput type="password" formControlName="newPassword" required>
            <mat-error *ngIf="changePasswordForm.get('newPassword')?.errors?.['required']">
              New password is required
            </mat-error>
            <mat-error *ngIf="changePasswordForm.get('newPassword')?.errors?.['minlength']">
              Password must be at least 8 characters
            </mat-error>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Confirm New Password</mat-label>
            <input matInput type="password" formControlName="confirmPassword" required>
            <mat-error *ngIf="changePasswordForm.get('confirmPassword')?.errors?.['required']">
              Password confirmation is required
            </mat-error>
            <mat-error *ngIf="changePasswordForm.get('confirmPassword')?.errors?.['passwordMismatch']">
              Passwords do not match
            </mat-error>
          </mat-form-field>

          <div class="flex justify-between space-x-4">
            <button mat-button type="button" (click)="onCancel()" class="w-1/2">
              Cancel
            </button>
            <button mat-raised-button color="primary" type="submit" class="w-1/2" 
                    [disabled]="changePasswordForm.invalid || isLoading">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { currentPassword, newPassword } = this.changePasswordForm.value;

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.snackBar.open('Password changed successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/common/profile']);
      },
      error: (error) => {
        this.snackBar.open(error.error?.message || 'Failed to change password', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/common/profile']);
  }
} 