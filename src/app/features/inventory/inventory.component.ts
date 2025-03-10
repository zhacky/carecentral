// src/app/inventory/inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/services/inventory.service';
import { InventoryItem } from '../../core/models/inventory-item.model';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import {
  RestockInventoryComponent
} from '../../shared/components/restock-inventory/restock-inventory.component';
import { FormsModule } from '@angular/forms';

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
    DatePipe
  ],
  standalone: true
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;
  restockQuantity: number = 0;
  showModal: boolean = false;
  showAddProductModal: boolean = false;
  showEditProductModal: boolean = false;  // For Edit Product modal
  newProduct: InventoryItem = { id: 0, name: '', quantity: 0, price: 0, expirationDate: new Date() };
  productToEdit: InventoryItem = { id: 0, name: '', quantity: 0, price: 0, expirationDate: new Date() };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    // Fetch inventory items from the service
    this.inventoryItems = this.inventoryService.getInventory();
  }


  closeRestockModal(): void {
    this.showModal = false;
  }

  restockItem(): void {
    if (this.selectedItem) {
      // Update the quantity in the service
      this.inventoryService.restockItem(this.selectedItem.id, this.restockQuantity);
      this.showModal = false;
      this.refreshInventory();
    }
  }

  // Open the Add Product modal
  openAddProductModal(): void {
    this.newProduct = { id: 0, name: '', quantity: 0, price: 0,  expirationDate: new Date() };  // Reset new product form
    this.showAddProductModal = true;
  }

  // Close the Add Product modal
  closeAddProductModal(): void {
    this.showAddProductModal = false;
  }

  // Add the new product to the inventory
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.quantity > 0 && this.newProduct.price > 0) {
      this.inventoryService.addProduct(this.newProduct);
      this.showAddProductModal = false;
      this.refreshInventory();
    } else {
      alert('Please fill out all fields with valid data.');
    }
  }

  // Open the Edit Product modal
  openEditProductModal(item: InventoryItem): void {
    this.productToEdit = { ...item };  // Copy the item to the edit form
    this.showEditProductModal = true;
  }

  // Close the Edit Product modal
  closeEditProductModal(): void {
    this.showEditProductModal = false;
  }

  // Save the edited product
  editProduct(): void {
    if (this.productToEdit.name && this.productToEdit.quantity > 0 && this.productToEdit.price > 0) {
      this.inventoryService.editProduct(this.productToEdit);
      this.showEditProductModal = false;
      this.refreshInventory();
    } else {
      alert('Please fill out all fields with valid data.');
    }
  }

  // Delete the product
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteProduct(id);
      this.refreshInventory();
    }
  }

  // Refresh the inventory list
  refreshInventory(): void {
    this.inventoryItems = this.inventoryService.getInventory();
  }
}
