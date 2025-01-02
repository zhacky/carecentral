import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

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
    name: '',
    email: '',
    phone: '',
    address: '123 Main St., Anytown, USA',
    position: 'Software Developer',
    birtday: '01/01/1990',
    gender: ''
  };

  constructor(public dialogRef: MatDialogRef<AddPatientDialogComponent>) {}

  save(): void {
    // Save the profile changes (send to API or update local data)
    console.log('Profile saved:', this.profile);
    this.dialogRef.close(this.profile);
  }
}
