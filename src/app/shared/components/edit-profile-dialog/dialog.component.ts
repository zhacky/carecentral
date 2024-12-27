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
  selector: 'app-edit-profile-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class EditProfileDialogComponent {
  profile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123 456 7890',
    address: '123 Main St., Anytown, USA',
    position: 'Software Developer',
  };

  constructor(public dialogRef: MatDialogRef<EditProfileDialogComponent>) {}

  save(): void {
    // Save the profile changes (send to API or update local data)
    console.log('Profile saved:', this.profile);
    this.dialogRef.close(this.profile);
  }
}
