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
import {Router, RouterLink} from '@angular/router';
import {PhilhealthService} from '../../core/services/philhealth.service';
import {PhilhealthDto} from '../../core/models/philhealth.model';

@Component({
  selector: 'app-philhealth',
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
    RouterLink
  ],
  templateUrl: './philhealth.component.html',
  standalone: true,
  styleUrl: './philhealth.component.css',
})
export class PhilhealthComponent implements AfterViewInit, OnInit {
  constructor(
    private philhealthService: PhilhealthService,
    private router: Router,
  ) {}

  // Define the columns for the table (including position, first name, last name, etc.)
  displayedColumns: string[] = [
    'patPIN',
    'patFirstName',
    'patLastName',
    'dateAdmitted',
    'actions',
  ];

  // DataSource for the table (initially empty)
  dataSource = new MatTableDataSource<PhilhealthDto>([]);

  searchTerm = '';

  editPhilhealth(philhealthId: number) {
    this.router.navigate(['/common/philhealth/edit', philhealthId]);
  }

  viewPhilhealth(philhealthId: number) {
    this.router.navigate(['/common/philhealth/details', philhealthId]);
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: PhilhealthDto, filter: string) => {
      // filter = filter.trim().toLowerCase();
      return (
        data.patFirstName.toLowerCase().includes(filter) ||
        data.patLastName.toLowerCase().includes(filter) ||
        data.patPIN.toString().includes(filter)
      );
    };
  }

  // Fetch patients when the component initializes
  ngOnInit(): void {
    this.loadPhilhealths();
  }

  // Load the philhealths using the service
  loadPhilhealths(): void {
    this.philhealthService.getPhilhealths().subscribe(
      (philhealths) => {
        // Add position dynamically
        this.dataSource.data = philhealths.map((philhealth, index) => ({
          ...philhealth,
          position: index + 1, // Position starts at 1 and increments
        }));
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching philhealths:', error);
      },
    );
  }

  // Function to delete a philhealth
  deletePhilhealth(philhealthId: number): void {
    if (confirm('Are you sure you want to delete this philhealth?')) {
      this.philhealthService.deletePhilhealth(philhealthId).subscribe(
        () => {
          // Remove the philhealth from the data source after successful deletion
          this.dataSource.data = this.dataSource.data.filter(
            (philhealth) => philhealth.philhealthId !== philhealthId,
          );
        },
        (error) => {
          console.error('Error deleting philhealth:', error);
        },
      );
    }
  }
}
