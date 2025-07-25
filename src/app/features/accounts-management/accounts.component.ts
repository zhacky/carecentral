import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SetRoleDialogComponent} from '../../shared/components/set-role-dialog/set-role-dialog.component';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {ConfirmDialogComponent} from '../../shared/components/dialog/confirm-dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SearchInputComponent} from './accounts/search-input/search-input.component';
import {PageTemplateComponent} from '../../shared/components/page-template/page-template.component';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-accounts',
  styleUrl: 'accounts.component.css',
  templateUrl: 'accounts.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatChipsModule, CommonModule, FormsModule, SearchInputComponent, PageTemplateComponent]
})

export class AccountsManagementComponent implements AfterViewInit, OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

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
        email: element.email
      }
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

  setRoleAndStatus(id: number) {
    this.router.navigate(['/common/accounts/edit', id]);
  }

  applyFilter(searchValue: string): void {
    this.searchTerm = searchValue;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  deleteUser(userId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Account',
        message: 'Are you sure you want to delete this account?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteUser(userId).subscribe({
          next: () => {
            this.fetchUsers();
            this.snackBar.open('Account successfully deleted.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          },
          error: (err) => {
            this.snackBar.open('Account successfully deleted.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            console.error(err);
          }
        });
      }
    });
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
