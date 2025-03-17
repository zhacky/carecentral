import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory.service';
import { InventoryItem } from '../../core/models/inventory-item.model';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { RestockInventoryComponent } from '../../shared/components/restock-inventory/restock-inventory.component';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  imports: [
    CurrencyPipe,
    RestockInventoryComponent,
    NgIf,
    NgForOf,
    FormsModule,
    DatePipe,
    MatIcon,
    RouterLink
  ],
  standalone: true
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  // Load inventory items from the backend
  loadInventory(): void {
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        this.inventoryItems = data;
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
