import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { DoctorService } from '../../../core/services/doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorDto } from '../../../core/models/doctor.model'; // Import the DoctorService

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
export class AddPatientDialogComponent implements OnInit {
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'birthday', 'gender'];
  dataSource: PatientDto[] = [];
  dataSourceDoc = new MatTableDataSource<DoctorDto>([]);
  showAddPatientForm: boolean = false;

  profile: PatientDto = new PatientDto(0, 0, '', '', '', '', '', '', '', 1); // Default assignedDoctorId is set to 1

  doctors: DoctorDto[] = []; // Array to store fetched doctors

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService, // Inject the DoctorService
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients(); // Load existing patients when the component is initialized
    this.loadDoctors(); // Load doctors when the component is initialized
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe((patients) => {
      this.dataSource = patients;
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (doctors) => {
        // Store fetched doctors in the `doctors` array
        this.doctors = doctors; // Now available for the dropdown
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
  // Show the form when the "Add Patient" button is clicked
  showForm(): void {
    this.showAddPatientForm = true;
  }

  // Save the patient and hide the form after submission
  save(): void {
    // Ensure the doctor is selected (assignedDoctorId is not empty)
    if (!this.profile.assignedDoctorId) {
      this.snackBar.open('Please assign a doctor to the patient.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });
      return; // Prevent saving if no doctor is assigned
    }

    // Call the service to create the patient with the assigned doctor ID
    this.patientService.createPatient(this.profile).subscribe((newPatient) => {
      this.dataSource = [...this.dataSource, newPatient];
      this.snackBar.open('Added Patient successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });

      // Redirect to the Patient List Page
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
