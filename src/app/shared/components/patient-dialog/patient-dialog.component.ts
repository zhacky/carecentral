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
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router) {
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
    this.profile.assignedDoctorId = 1; // Ensure the doctor is always set

    this.patientService.createPatient(this.profile).subscribe(newPatient => {
      this.dataSource = [...this.dataSource, newPatient]; // Update the list
      this.snackBar.open('Added Patient successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });

      // ✅ Redirect to the Patient List Page
      this.router.navigate(['/common/patient']);
    });
  }

  // Cancel the action and hide the form
  cancel(): void {
    this.showAddPatientForm = false;
  }

  goBack(): void {
    this.location.back(); // ⬅️ Navigates to the previous page
  }
}
