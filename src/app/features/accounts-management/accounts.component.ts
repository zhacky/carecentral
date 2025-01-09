import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SetRoleDialogComponent } from '../../shared/components/set-role-dialog/set-role-dialog.component';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-accounts',
  styleUrl: 'accounts.component.css',
  templateUrl: 'accounts.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, CommonModule],
})

export class AccountsManagementComponent implements AfterViewInit {
  constructor(private dialog: MatDialog) {}
  
  displayedColumns: string[] = ['position', 'name', 'lastName', 'role', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(SetRoleDialogComponent, {
      width: '400px',
      data: { name: `${element.name} ${element.lastName}`, role: element.role },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated role:', result);
        // Update the data source with the new role
        const index = this.dataSource.data.findIndex((item) => item.position === element.position);
        if (index !== -1) {
          this.dataSource.data[index].role = result.role;
          this.dataSource.data = [...this.dataSource.data]; // Refresh the data source
        }
      }
    });
  }

  performAction(element: any): void {
    console.log('Action performed for:', element);
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  lastName: string;
  role: string;  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'James', lastName: "Anderson", role: 'Nurse'},
  {position: 2, name: 'Liam', lastName: "Carter", role: 'Admin'},
  {position: 3, name: 'Ethan', lastName: "Johnson", role: 'Doctor'},
  {position: 4, name: 'Noah', lastName: "Davis", role: 'Receptionist'},
  {position: 5, name: 'Mason Wilson', lastName: "Wilson", role: 'Billing Staff'},
  {position: 6, name: 'Emma Brown', lastName: "Brown", role: 'Billing Staff'},
  {position: 7, name: 'Olivia Garcia', lastName: "Garcia", role: 'Nurse'},
  {position: 8, name: 'Ava Martinez', lastName: "Martinez", role: 'Nurse'},
  {position: 9, name: 'Sophia Thomas', lastName: "Thomas", role: 'Nurse'},
  {position: 10, name: 'Isabella Robinson', lastName: "Robinson", role: 'Nurse'},
  {position: 11, name: 'Alex Taylor', lastName: "Taylor", role: 'Nurse'},
  {position: 12, name: 'Jet', lastName: "Lee", role: 'Nurse'},
  {position: 13, name: 'Jordan Lee', lastName: "Lee", role: 'Nurse'},
  {position: 14, name: 'Casey Morgan', lastName: "Morgan", role: 'Nurse'},
  {position: 15, name: 'Riley Walker', lastName: "Walker", role: 'Nurse'},
  {position: 16, name: 'Taylor Scott', lastName: "Scott", role: 'Billing Staff'},
  {position: 17, name: 'Jacob Harris', lastName: "Harris", role: 'Billing Staff'},
  {position: 18, name: 'Argon', lastName: "Ghandalf", role: 'Doctor'},
  {position: 19, name: 'Alexander Wright', lastName: "Wright", role: 'Doctor'},
  {position: 20, name: 'Daniel Perez', lastName: "Perez", role: 'Doctor'},
];
