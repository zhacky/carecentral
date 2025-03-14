import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { PatientDto } from '../../../core/models/patient.model';
import { PatientService } from '../../../core/services/patient.service';

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
  standalone: true
})
export class AddPatientDialogComponent {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'birthday', 'gender'];
  dataSource: PatientDto[] = [];
  showAddPatientForm: boolean = false; // Flag to show/hide the form

  profile: PatientDto = new PatientDto(0, 0, '', '', '', '', '', '', '', 1); // Default assignedDoctorId is set to 1

  constructor(private patientService: PatientService, private snackBar: MatSnackBar) {
    this.loadPatients(); // Load existing patients when the component is initialized
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.dataSource = patients;
    });
  }

  // Show the form when the "Add Patient" button is clicked
  showForm(): void {
    this.showAddPatientForm = true;
  }

  // Save the patient and hide the form after submission
  save(): void {
    // Ensure the assignedDoctorId is always set to 1 before saving
    this.profile.assignedDoctorId = 1;

    // Call the service to save the new patient
    this.patientService.createPatient(this.profile).subscribe(newPatient => {
      // Update the data source with the new patient data
      this.dataSource = [...this.dataSource, newPatient];
      this.showAddPatientForm = false; // Hide the form after saving
      this.snackBar.open('Added Patient successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
    });
  }

  // Cancel the action and hide the form
  cancel(): void {
    this.showAddPatientForm = false;
  }
}
