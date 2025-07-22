import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PatientRecord} from '../../core/models/patient-record.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PageTemplateComponent} from '../../shared/components/page-template/page-template.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {Patient} from '../../core/models/patient.model';
import {MatButton} from '@angular/material/button';
import {PatientService} from '../../core/services/patient.service';
import {PatientRecordService} from '../../core/services/patient-record.service';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrl: './patient-record.component.css',
  imports: [
    MatTable,
    MatPaginator,
    FormsModule,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    PageTemplateComponent,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    MatButton,
    MatCell,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  standalone: true
})
export class PatientRecordComponent implements OnInit, AfterViewInit {
  patients: Patient[] = [];
  selectedPatientId: number | null = null;
  searchTerm: string = '';
  dataSource: MatTableDataSource<PatientRecord>;

  displayedColumns: string[] = ['patientRecordId', 'visitDate', 'diagnosis', 'prescription', 'note', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private patientService: PatientService,
    private patientRecordService: PatientRecordService,
    private route: ActivatedRoute,
    private router: Router) {

    this.dataSource = new MatTableDataSource<PatientRecord>([]);
    this.dataSource.filterPredicate = (data: PatientRecord, filter: string) => {
      const searchString = filter.trim().toLowerCase();
      const topLevelMatch =
        data.patientRecordId.toString().toLowerCase().includes(searchString) ||
        data.visitDate.toLowerCase().includes(searchString) ||
        data.diagnosis.toLowerCase().includes(searchString) ||
        data.prescription.toLowerCase().includes(searchString) ||
        data.note.toLowerCase().includes(searchString);

      if (topLevelMatch) {
        return true;
      }
      return false;
    };
  }




  //region Events
  ngOnInit() {
    this.loadPatients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onPatientChange() {
    if (this.selectedPatientId) {
      this.patientRecordService.getPatientRecordsForPatient(this.selectedPatientId).subscribe(records => {
      this.dataSource.data = records;
      this.dataSource.filter = '';
      this.searchTerm = '';
        });

    } else {
      this.dataSource.data = [];
    }
  }

  //endregion


  //region Private Methods
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
  viewPatientRecordDetails(patientRecord: PatientRecord): void {
    this.router.navigate(['/common/patient-record/details', patientRecord.patientRecordId]);
  }

  editPatientRecord(patientRecord: PatientRecord): void {
    this.router.navigate(['/common/patient-record/edit', patientRecord.patientRecordId], {queryParams: {patientId: this.selectedPatientId}});
  }
  deletePatientRecord(patientRecord: PatientRecord): void {
    this.router.navigate(['/common/patient-record/delete', patientRecord.patientRecordId], {queryParams: {patientId: this.selectedPatientId}});
  }
  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  addPatientRecord(): void {
    this.router.navigate(['/common/patient-record/add'], {queryParams: {patientId: this.selectedPatientId}});
  }
  //endregion
}
