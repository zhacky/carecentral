import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
import {MatPaginator} from '@angular/material/paginator';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {DoctorService} from '../../core/services/doctor.service';
import {Doctor, DoctorStatus} from '../../core/models/doctor.model';
import {PageTemplateComponent} from '../../shared/components/page-template/page-template.component';

@Component({
  selector: 'app-doctor',
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
    NgClass,
    RouterLink,
    PageTemplateComponent
  ],
  templateUrl: './doctor.component.html',
  standalone: true,
  styleUrl: './doctor.component.css',
})
export class DoctorComponent implements AfterViewInit, OnInit {
  constructor(
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  // Define the columns for the table (including position, first name, last name, etc.)
  displayedColumns: string[] = [
    'doctorId',
    'firstName',
    'lastName',
    'gender',
    'status',
    'actions',
  ];

  // DataSource for the table (initially empty)
  dataSource = new MatTableDataSource<Doctor>([]);

  searchTerm = '';

  editDoctor(doctorId: number) {
    this.router.navigate(['/common/doctor/edit', doctorId]);
  }

  viewDoctor(doctorId: number) {
    this.router.navigate(['/common/doctor/details', doctorId]);
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Doctor, filter: string) => {
      return (
        data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter) ||
        data.doctorId.toString().includes(filter)
      );
    };
  }

  // Fetch patients when the component initializes
  ngOnInit(): void {
    this.loadDoctors();
  }

  // Load the patients using the service
  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (doctors) => {
        // Add position dynamically
        this.dataSource.data = doctors.map((doctor, index) => ({
          ...doctor,
          position: index + 1, // Position starts at 1 and increments
        }));
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      },
    );
  }

  // Function to delete a doctor
  deleteDoctor(doctorId: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(doctorId).subscribe(
        () => {
          // Remove the patient from the data source after successful deletion
          this.dataSource.data = this.dataSource.data.filter(
            (doctor) => doctor.doctorId !== doctorId,
          );
        },
        (error) => {
          console.error('Error deleting patient:', error);
        },
      );
    }
  }

  protected readonly DoctorStatus = DoctorStatus;
}
