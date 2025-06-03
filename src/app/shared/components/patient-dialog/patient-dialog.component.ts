import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {Patient} from '../../../core/models/patient.model';
import {PatientService} from '../../../core/services/patient.service';
import {Router} from '@angular/router';
import {DoctorService} from '../../../core/services/doctor.service';
import {MatTableDataSource} from '@angular/material/table';
import {Doctor} from '../../../core/models/doctor.model'; // Import the DoctorService

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
  dataSource: Patient[] = [];
  dataSourceDoc = new MatTableDataSource<Doctor>([]);
  showAddPatientForm = false;

  profile: Patient = new Patient(
    0, // id
    0, // assignedDoctorId
    '', // firstName
    '', // lastName
    '', // birthday
    '', // gender
    '', // address
    '', // city
    '', // state
    '', // zip
    '', // phone
    '', // email
    '', // insurance
    '', // policyNumber
    '', // emergencyContact
    '', // emergencyPhone
    '', // allergies
    '', // medications
    '', // medicalHistory
    '', // notes
    '', // status
    '', // createdAt
    0, // updatedAt
    '', // deletedAt
    0   // someNumberField (ensure this matches your model)
  ); // Default assignedDoctorId is set to 1

  doctors: Doctor[] = []; // Array to store fetched doctors

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService, // Inject the DoctorService
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

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
  save(formRef: NgForm): void {

    if (this.formRef.invalid) {
      // Mark all controls as touched to show validation errors
      Object.values(this.formRef.controls).forEach(control => {
        control.markAsTouched();
      });

      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });

      return; // Stop here if form is invalid
    }
    // // Ensure the doctor is selected (assignedDoctorId is not empty)
    // if (!this.profile.assignedDoctorId) {
    //   this.snackBar.open('Please assign a doctor to the patient.', 'Close', {
    //     duration: 5000,
    //     panelClass: ['snackbar-error']
    //   });
    //   return; // Prevent saving if no doctor is assigned
    // }

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

  goBack(): void {
    this.location.back(); // ⬅️ Navigates to the previous page
  }
}
