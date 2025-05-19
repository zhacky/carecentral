import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SetRoleDialogComponent } from '../../shared/components/set-role-dialog/set-role-dialog.component';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-accounts',
  styleUrl: 'accounts.component.css',
  templateUrl: 'accounts.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatChipsModule, CommonModule, FormsModule, RouterLink],
})

export class AccountsManagementComponent implements AfterViewInit, OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  displayedColumns: string[] = ['position', 'lastName', 'firstName', 'email', 'username', 'status', 'role', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users.map((user, index) => ({
          id: user.id, 
          position: index + 1,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status,
          role: user.roles.map((r: any) => r.name).join(', ')
        }));
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(SetRoleDialogComponent, {
      width: '400px',
      data: {
        id: element.id,
        name: `${element.username} ${element.email}`,
        role: element.role,
        username: element.username,
        firstName: element.firstName,
        lastName: element.lastName,
        status: element.status,
        email: element.email, 
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((item) => item.position === element.position);
        if (index !== -1) {
          this.dataSource.data[index].role = result.role;
          this.dataSource.data = [...this.dataSource.data]; 
        }
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  getStatusClass(status: string): string {
  switch (status) {
    case 'Active':
      return 'chip-green';
    case 'Pending':
      return 'chip-yellow';
    case 'Suspended':
      return 'chip-orange';
    case 'Inactive':
      return 'chip-blue';
    case 'Deactivated':
      return 'chip-red';
    default:
      return '';
  }
}
}


export interface PeriodicElement {
  id: string; 
  username: string;
  position: number;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
}

