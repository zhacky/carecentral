import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule, MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';


@Component({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],  
  providers: [provideNativeDateAdapter()],
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css'],
})
export class AddPatientDialogComponent {
  profile = {
    name: '',
    lastName: '',
    birthday: '',
    phone: '',
    address: '',
    position: '',
    gender: ''
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
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
