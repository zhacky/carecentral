import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCellDef, MatColumnDef, MatHeaderCellDef, MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PatientRecord} from '../../core/models/patient-record.model';
import {Router} from '@angular/router';
import {PageTemplateComponent} from '../../shared/components/page-template/page-template.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {Patient} from '../../core/models/patient.model';

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
    NgIf
  ],
  standalone: true
})
export class PatientRecordComponent implements AfterViewInit {
  patients: Patient[] = [];
  selectedPatientId: number | null = null;
  searchTerm: string = '';

  constructor(private router: Router,) {
  }
  dataSource = new MatTableDataSource<PatientRecord>([]);

  displayedColumns: string[] = ['patientId', 'visitDate'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  //region Events
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onPatientChange() {
    if (this.selectedPatientId) {

    }
  }
  //endregion


  viewPatientRecord(patientRecordId: number) {
    //
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  addPatientRecord(): void {
    this.router.navigate(['/common/patient-record/add'], { queryParams: { patientId: this.selectedPatientId } });
  }
}
