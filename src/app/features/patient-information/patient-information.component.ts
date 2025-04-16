import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {PatientDto} from '../../core/models/patient.model';
import {PatientService} from '../../core/services/patient.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms'; // Import the service

@Component({
  selector: 'app-patient-information',
  styleUrls: ['./patient-information.component.css'],
  templateUrl: './patient-information.component.html',
  imports: [
    MatTable,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    FormsModule
  ],
  standalone: true
})
export class PatientInformationComponent implements AfterViewInit, OnInit {
  constructor(private dialog: MatDialog, private patientService: PatientService, private router: Router) {}

  // Define the columns for the table (including position, first name, last name, etc.)
  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'actions'];

  // DataSource for the table (initially empty)
  dataSource = new MatTableDataSource<PatientDto>([]);

  searchTerm: string = '';

  editPatient( patientId: number ) {
    this.router.navigate(['/common/patient/edit', patientId]);
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  addPatient() {
    this.router.navigate(['/common/patient/add'])
  }

  viewPatient(patientId: number) {
    this.router.navigate(['/common/patient/details', patientId]);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: PatientDto, filter: string) => {
      return (
        data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) ||
        data.gender.toLowerCase().includes(filter) ||
        data.patientId.toString().includes(filter)
      );
    };
  }

  // Fetch patients when the component initializes
  ngOnInit(): void {
    this.loadPatients();
  }

  // Load the patients using the service
  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (patients) => {
        // Add position dynamically
        this.dataSource.data = patients.map((patient, index) => ({
          ...patient,
          position: index + 1,  // Position starts at 1 and increments
        }));
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  // // Function to open the dialog for adding a new patient
  // openPatientDialog(): void {
  //   console.log('Opening add patient dialog');
  //   const dialogRef = this.dialog.open(AddPatientDialogComponent, {
  //     width: '400px',
  //   });
  //
  //   // Handle the dialog result when it's closed
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     if (result) {
  //       console.log('New patient profile:', result);
  //
  //       // Create a new PatientDto object with the added patient data
  //       const newPatient = new PatientDto(
  //         0,  // The position is not required when creating a patient
  //         result.patientId,
  //         result.firstName,
  //         result.lastName,
  //         result.dateOfBirth,
  //         result.gender,
  //         result.contactNumber,
  //         result.email,
  //         result.address,
  //         result.assignedDoctorId
  //       );
  //
  //       // Call the service to add the new patient
  //       this.patientService.createPatient(newPatient).subscribe(
  //         (patient) => {
  //           // Add the new patient to the data source
  //           this.dataSource.data = [...this.dataSource.data, patient];
  //         },
  //         (error) => {
  //           console.error('Error adding patient:', error);
  //         }
  //       );
  //     }
  //   });
  // }

  // Function to delete a patient
  deletePatient(patientId: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(patientId).subscribe(
        () => {
          // Remove the patient from the data source after successful deletion
          this.dataSource.data = this.dataSource.data.filter(patient => patient.patientId !== patientId);
        },
        (error) => {
          console.error('Error deleting patient:', error);
        }
      );
    }
  }

  // // Function to update a patient
  // updatePatient(patient: PatientDto): void {
  //   const dialogRef = this.dialog.open(AddPatientDialogComponent, {
  //     width: '400px',
  //     data: patient,  // Pass existing patient data to the dialog for editing
  //   });
  //
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     if (result) {
  //       // Update the patient object with new data
  //       const updatedPatient = new PatientDto(
  //         patient.position, // Keep the position the same
  //         result.patientId,
  //         result.firstName,
  //         result.lastName,
  //         result.dateOfBirth,
  //         result.gender,
  //         result.contactNumber,
  //         result.email,
  //         result.address,
  //         result.assignedDoctorId
  //       );
  //
  //       // Call the service to update the patient
  //       this.patientService.updatePatient(patient.patientId, updatedPatient).subscribe(
  //         (patient) => {
  //           // Update the patient data in the table
  //           this.dataSource.data = this.dataSource.data.map(p =>
  //             p.patientId === patient.patientId ? patient : p
  //           );
  //         },
  //         (error) => {
  //           console.error('Error updating patient:', error);
  //         }
  //       );
  //     }
  //   });
  //}
}
