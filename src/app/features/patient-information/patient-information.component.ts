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
import {Patient} from '../../core/models/patient.model';
import {PatientService} from '../../core/services/patient.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms'; // Import the service
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

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
    FormsModule,
    CommonModule
  ],
  standalone: true
})
export class PatientInformationComponent implements AfterViewInit, OnInit {
  constructor(private dialog: MatDialog, private patientService: PatientService, private router: Router, private authService: AuthService) {}

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  // Define the columns for the table (including position, first name, last name, etc.)
  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'actions'];

  // DataSource for the table (initially empty)
  dataSource = new MatTableDataSource<Patient>([]);

  searchTerm = '';

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
    this.dataSource.filterPredicate = (data: Patient, filter: string) => {
      return (
        data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) ||
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
}
