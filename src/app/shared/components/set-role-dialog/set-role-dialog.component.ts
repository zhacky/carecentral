import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-set-role-dialog',
  imports: [MatFormFieldModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, CommonModule, MatInputModule ],
  standalone: true,
  templateUrl: './set-role-dialog.component.html',
  styleUrls: ['./set-role-dialog.component.css'],
})
export class SetRoleDialogComponent {
  editForm: FormGroup;
  roles: { name: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<SetRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.editForm = this.fb.group({
      name: [{ value: data.name, disabled: true }, Validators.required],
      role: [data.role, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    this.authService.getRoles().subscribe({
      next: (roles) => {
        if (roles.length > 0 && typeof roles[0] === 'string') {
          this.roles = roles.map((role) => ({ name: role }));
        } else {
          this.roles = roles.map((role) => (typeof role === 'string' ? { name: role } : role));
        }
      },
      error: (err) => {
        console.error('Failed to fetch roles:', err);
        this.snackBar.open('Failed to load roles. Please try again later.', 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedRole = this.editForm.value.role;
      const userId = this.data.id;

      const requestBody = {
        username: this.data.username,
        email: this.data.email,      
        roles: updatedRole.id,
      };
      console.log('Authorization Token:', this.authService.getToken());
      this.authService.updateUserRole(userId, requestBody).subscribe({
        next: () => {
          this.dialogRef.close({role: updatedRole.name});
          this.snackBar.open(`Role successfully updated for ${this.data.name}`, 'Close', {
            duration: 5000,
            panelClass: ['snackbar-success'],
          });
        },
        error: (err) => {
          console.error('Failed to update role:', err);
          this.snackBar.open('Failed to update role. Please try again later.', 'Close', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}