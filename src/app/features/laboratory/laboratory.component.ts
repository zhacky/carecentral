import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { Laboratory } from '../../core/models/laboratory.model';
import { LaboratoryService } from '../../core/services/laboratory.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput
  ]
})
export class LaboratoryComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'labId',
    'testName',
    'patientName',
    'date',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Laboratory>([]);
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private laboratoryService: LaboratoryService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Laboratory, filter: string) => {
      return (
        data.testName.toLowerCase().includes(filter) ||
        data.patientName.toLowerCase().includes(filter) ||
        data.labId.toString().includes(filter)
      );
    };
  }

  ngOnInit(): void {
    this.loadLaboratoryRecords();
  }

  loadLaboratoryRecords(): void {
    this.laboratoryService.getLaboratoryRecords().subscribe({
      next: (records) => {
        this.dataSource.data = records;
      },
      error: (error) => {
        console.error('Error fetching laboratory records:', error);
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  viewRecord(labId: number): void {
    this.router.navigate(['/common/laboratory/details', labId]);
  }

  editRecord(labId: number): void {
    this.router.navigate(['/common/laboratory/edit', labId]);
  }

  deleteRecord(labId: number): void {
    if (confirm('Are you sure you want to delete this laboratory record?')) {
      this.laboratoryService.deleteLaboratoryRecord(labId).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            (record) => record.labId !== labId
          );
        },
        error: (error) => {
          console.error('Error deleting laboratory record:', error);
        }
      });
    }
  }
}
