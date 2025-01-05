import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css'],
})
export class AddPatientDialogComponent {
  profile = {
    name: 'adsad',
    lastName: 'asdasd',
    birtday: '01/01/1990',
    phone: '12321',
    address: '123 Main St., Anytown, USA',
    position: 'Software Developer',
    gender: 'Female'
  };

  constructor(public dialogRef: MatDialogRef<AddPatientDialogComponent>, private snackBar: MatSnackBar) {}

  save(): void {
    // Save the profile changes (send to API or update local data)
    console.log('Profile saved:', this.profile);
    this.dialogRef.close(this.profile);
    this.snackBar.open('Added Patient successfully!', 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }
}
