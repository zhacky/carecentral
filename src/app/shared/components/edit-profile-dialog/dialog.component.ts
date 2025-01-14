import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ],  
  selector: 'app-edit-profile-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class EditProfileDialogComponent {
  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    position: '',
  };

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar

  ) {
    this.profile = { ...data.profile };
  }

  save(): void {
    // Save the profile changes (send to API or update local data)
    console.log('Profile saved:', this.profile);
    this.dialogRef.close(this.profile);
    this.snackBar.open('Profile saved successfully!', 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }
}
