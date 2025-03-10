import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private inventory: InventoryItem[] = [
    { id: 1, name: 'Neozep', quantity: 10, price: 100, expirationDate: new Date('2025-12-31') },
    { id: 2, name: 'Co-Aleva', quantity: 5, price: 200, expirationDate: new Date('2025-06-30') },
    { id: 3, name: 'Biogesic', quantity: 20, price: 150, expirationDate: new Date('2025-09-15') },

  ];

  constructor() {}

  // Get all inventory items
  getInventory(): InventoryItem[] {
    return this.inventory;
  }

  // Add a new product
  addProduct(newProduct: InventoryItem): void {
    const newId = this.inventory.length > 0 ? Math.max(...this.inventory.map(item => item.id)) + 1 : 1;
    newProduct.id = newId;
    this.inventory.push(newProduct);
  }

  // Restock an item by its id
  restockItem(id: number, quantity: number): void {
    const item = this.inventory.find((item) => item.id === id);
    if (item) {
      item.quantity += quantity;
    }
  }

  // Edit an existing product
  editProduct(updatedProduct: InventoryItem): void {
    const index = this.inventory.findIndex((item) => item.id === updatedProduct.id);
    if (index !== -1) {
      this.inventory[index] = updatedProduct;
    }
  }

  // Delete a product by its id
  deleteProduct(id: number): void {
    this.inventory = this.inventory.filter(item => item.id !== id);
  }
}
