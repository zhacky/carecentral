import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AddPatientDialogComponent } from '../../shared/components/patient-dialog/patient-dialog.component';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-patient-information',
  styleUrl: 'patient-information.component.css',
  templateUrl: 'patient-information.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, CommonModule],
})

export class PatientInformationComponent implements AfterViewInit {
  constructor(private dialog: MatDialog) {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'birthday', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openPatientDialog(): void {
    console.log('Opening add patient dialog');
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Updated profile:', result);
        // Update the data source with the new patient data
        const newPatient: PeriodicElement = {
          position: this.dataSource.data.length + 1,
          name: result.name,
          lastName: result.lastName,
          gender: result.gender,
          birthday: result.birthday
        };
        this.dataSource.data = [...this.dataSource.data, newPatient];
      }
    });
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  lastName: string;
  gender: string;
  birthday: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'James', lastName: "Anderson", gender: 'Male', birthday: ''},
  {position: 2, name: 'Liam', lastName: "Carter", gender: 'Male', birthday: ''},
  {position: 3, name: 'Ethan', lastName: "Johnson", gender: 'Male', birthday: ''},
  {position: 4, name: 'Noah', lastName: "Davis", gender: 'Male', birthday: ''},
  {position: 5, name: 'Mason Wilson', lastName: "Wilson", gender: 'Male', birthday: ''},
  {position: 6, name: 'Emma Brown', lastName: "Brown", gender: 'Female', birthday: ''},
  {position: 7, name: 'Olivia Garcia', lastName: "Garcia", gender: 'Female', birthday: ''},
  {position: 8, name: 'Ava Martinez', lastName: "Martinez", gender: 'Female', birthday: ''},
  {position: 9, name: 'Sophia Thomas', lastName: "Thomas", gender: 'Female', birthday: ''},
  {position: 10, name: 'Isabella Robinson', lastName: "Robinson", gender: 'Female', birthday: ''},
  {position: 11, name: 'Alex Taylor', lastName: "Taylor", gender: 'Female', birthday: ''},
  {position: 12, name: 'Jet', lastName: "Lee", gender: 'Male', birthday: ''},
  {position: 13, name: 'Jordan Lee', lastName: "Lee", gender: 'Male', birthday: ''},
  {position: 14, name: 'Casey Morgan', lastName: "Morgan", gender: 'Female', birthday: ''},
  {position: 15, name: 'Riley Walker', lastName: "Walker", gender: 'Male', birthday: ''},
  {position: 16, name: 'Taylor Scott', lastName: "Scott", gender: 'Female', birthday: ''},
  {position: 17, name: 'Jacob Harris', lastName: "Harris", gender: 'Male', birthday: ''},
  {position: 18, name: 'Argon', lastName: "Ghandalf", gender: 'Male', birthday: ''},
  {position: 19, name: 'Alexander Wright', lastName: "Wright", gender: 'Male', birthday: ''},
  {position: 20, name: 'Daniel Perez', lastName: "Perez", gender: 'Male', birthday: ''},
];
