import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {InventoryService} from '../../core/services/inventory.service';
import {InventoryItem} from '../../core/models/inventory-item.model';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {HttpErrorResponse} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  imports: [
    CurrencyPipe,
    FormsModule,
    DatePipe,
    MatIcon,
    RouterLink,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator
  ],
  standalone: true
})
export class InventoryComponent implements AfterViewInit, OnInit {
  inventoryItems: InventoryItem[] = [];
  searchTerm = '';
  dataSource = new MatTableDataSource<InventoryItem>([]);

  constructor(private inventoryService: InventoryService, private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadInventory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: InventoryItem, filter: string) => {
      return (
        data.inventoryName.toLowerCase().includes(filter)
      );
    }
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }


  // Load inventory items from the backend
  loadInventory(): void {
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        this.inventoryItems = data;
        this.dataSource.data = data.map((item, index)=> ({
          ...item,
          position: index + 1,
        }));
        this.dataSource.paginator = this.paginator;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching inventory items:', err);
        alert('An error occurred while loading inventory.');
      }
    });

  }

  // Navigate to the Add Product page
  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']); // Use the router to navigate to the add product page
  }

  // Delete the inventory item
  displayedColumns: string[] = ['inventoryId','inventoryName','quantity','price','expirationDate','actions'];
  deleteInventory(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteInventory(id).subscribe({
        next: () => {
          this.loadInventory(); // Refresh the inventory after deleting
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting inventory item:', err);
          alert('An error occurred while deleting the product.');
        }
      });
    }
  }
}
