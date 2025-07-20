import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCellDef, MatColumnDef, MatHeaderCellDef, MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PatientRecord} from '../../core/models/patient-record.model';
import {Router} from '@angular/router';

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
    MatCellDef
  ],
  standalone: true
})
export class PatientRecordComponent implements AfterViewInit {

  constructor(private router: Router,) {
  }
  dataSource = new MatTableDataSource<PatientRecord>([]);

  displayedColumns: string[] = ['patientId', 'visitDate'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  viewPatientRecord(patientRecordId: number) {
    //
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
