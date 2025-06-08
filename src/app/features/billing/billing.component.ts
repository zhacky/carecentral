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
import {Router, ActivatedRoute} from '@angular/router';

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

  displayedColumns: string[] = ['billingId', 'billingDate', 'items', 'totalAmount', 'actions'];

  constructor(
    private patientService: PatientService,
    private billingService: BillingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<Billing>([]);
    this.dataSource.filterPredicate = (data: Billing, filter: string) => {
      const searchString = filter.trim().toLowerCase();

      // Check top-level properties
      const topLevelMatch =
        data.billingId.toString().toLowerCase().includes(searchString) ||
        data.billingDate.toLowerCase().includes(searchString) ||
        data.totalAmount.toString().toLowerCase().includes(searchString);

      if (topLevelMatch) {
        return true;
      }

      // Check items array
      const itemsMatch = data.items.some(item =>
        item.itemName.toLowerCase().includes(searchString) ||
        item.itemDescription.toLowerCase().includes(searchString) ||
        item.billedBy.toLowerCase().includes(searchString) ||
        item.amount.toString().toLowerCase().includes(searchString)
      );

      return itemsMatch;
    };
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
      const patientId = this.route.snapshot.queryParamMap.get('patientId');
      if (patientId) {
        this.selectedPatientId = Number(patientId);
        this.onPatientChange();
      }
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

  viewBillingDetails(billing: Billing): void {
    this.router.navigate(['/common/billing/details', billing.billingId]);
  }

  editBilling(billing: Billing): void {
    this.router.navigate(['/common/billing/edit', billing.billingId], { queryParams: { patientId: this.selectedPatientId } });
  }
}
