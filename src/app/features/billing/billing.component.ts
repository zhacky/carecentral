import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {
  MatTable, MatColumnDef, MatCell, MatCellDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTableDataSource
} from '@angular/material/table';
import {CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {PatientService} from '../../core/services/patient.service';
import {BillingService} from '../../core/services/billing.service';
import {Patient} from '../../core/models/patient.model';
import {Billing} from '../../core/models/billing.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatTable,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgFor,
    NgIf,
    CurrencyPipe,
    FormsModule,
    MatPaginatorModule
  ],
  styleUrls: ['./billing.component.css'],
  standalone: true
})
export class BillingComponent implements OnInit, AfterViewInit {
  patients: Patient[] = [];
  selectedPatientId: number | null = null;
  dataSource: MatTableDataSource<Billing>;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['billingId', 'billingDate', 'items'];

  constructor(
    private patientService: PatientService,
    private billingService: BillingService
  ) {
    this.dataSource = new MatTableDataSource<Billing>([]);
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  onPatientChange() {
    if (this.selectedPatientId) {
      this.billingService.getBillingsForPatient(this.selectedPatientId).subscribe(billings => {
        this.dataSource.data = billings;
        this.dataSource.filter = ''; // Reset filter when patient changes
        this.searchTerm = '';
      });
    } else {
      this.dataSource.data = [];
    }
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
}
