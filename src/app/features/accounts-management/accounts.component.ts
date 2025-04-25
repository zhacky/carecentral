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

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-accounts',
  styleUrl: 'accounts.component.css',
  templateUrl: 'accounts.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, CommonModule, RouterLink],
})

export class AccountsManagementComponent implements AfterViewInit, OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  displayedColumns: string[] = ['position', 'username', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

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
          email: user.email,
          role: user.role
        }));
        console.log(users)
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
        email: element.email, 
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated role:', result);
        const index = this.dataSource.data.findIndex((item) => item.position === element.position);
        if (index !== -1) {
          this.dataSource.data[index].role = result.role;
          this.dataSource.data = [...this.dataSource.data]; 
        }
      }
    });
  }

  performAction(element: any): void {
    console.log('Action performed for:', element);
  }
}


export interface PeriodicElement {
  id: string; 
  username: string;
  position: number;
  email: string;
  role: string;
}

