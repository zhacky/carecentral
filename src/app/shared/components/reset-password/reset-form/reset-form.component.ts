import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-reset-form',
  standalone: true,
  imports: [FormsModule, NgFor, MatProgressSpinnerModule, CommonModule],
  templateUrl: './reset-form.component.html',
  styleUrl: './reset-form.component.css'
})

export class ResetFormComponent {
userId: string = '';
  selectedRoleId: number | null = null;
  user: any = null;
  roles: { id: number, name: string }[] = [];
  accountStatus: string = '';
  isLoading = false;
  newPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.fetchRoles();
      this.fetchUser();    
    }
  }

 fetchUser(): void {
    this.authService.getUsers().subscribe(users => {
      this.user = users.find(u => u.id == this.userId);
      if (this.user) {
        this.accountStatus = this.user.status || '';

        const currentRoleName = this.user.roles?.[0]?.name;
        const matchedRole = this.roles.find(role => role.name === currentRoleName);
        this.selectedRoleId = matchedRole?.id || null;
      }
    });
  }

  fetchRoles(): void {
    this.authService.getRoles().subscribe(roles => {
      this.roles = roles.map((role: any) => ({
        id: role.id,
        name: role.name
      }));

      // In case user is already loaded
      if (this.user) {
        const currentRoleName = this.user.roles?.[0]?.name;
        const matchedRole = this.roles.find(role => role.name === currentRoleName);
        this.selectedRoleId = matchedRole?.id || null;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/common/accounts']);
  }

  resetPassword(): void {
    if (!this.user || !this.selectedRoleId) {
      this.snackBar.open(`Missing user or role`, 'Close', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
      console.error('Missing user or role');
      return;
    }

    const requestBody = {
      username: this.user.username,
      email: this.user.email,
      roles: this.selectedRoleId,
      status: this.accountStatus
    };

    this.isLoading = true,
    setTimeout(() => {
    this.authService.updateUserRole(this.userId, requestBody).subscribe({
      next: () => {
         this.snackBar.open(`User updated successfully!`, 'Close', {
            duration: 5000,
            panelClass: ['snackbar-success'],
          });
        this.router.navigate(['/common/accounts']);
      },
      error: () => {
         this.snackBar.open(`Failed to update user role or status`, 'Close', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
      }
    });
  }, 2000);
  }

  adminChangePassword(): void {
  if (!this.userId || !this.newPassword) {
    this.snackBar.open('Please enter a new password.', 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
    return;
  }

  this.isLoading = true;
  this.authService.adminChangePassword(this.userId, this.newPassword).subscribe({
    next: () => {
      this.snackBar.open('Password changed successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success'],
      });
      this.isLoading = false;
      this.newPassword = '';
      this.router.navigate(['/common/accounts']);
    },
    error: () => {
      this.snackBar.open('Failed to change password.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
      this.isLoading = false;
    }
  });
}
}
