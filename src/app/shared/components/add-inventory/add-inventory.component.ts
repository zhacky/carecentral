import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {InventoryItem} from '../../../core/models/inventory-item.model';
import {InventoryService} from '../../../core/services/inventory.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class AddInventoryComponent {
  inventoryItem: InventoryItem = {
    inventoryId: 0,
    inventoryName: '',
    quantity: 0,
    price: 0,
    expirationDate: new Date(),
  };

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  saveInventory(): void {
    this.inventoryService.addInventory(this.inventoryItem).subscribe(() => {
      alert('Inventory added successfully!'); // Optional Snackbar
      this.router.navigate(['/common/inventory']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/inventory']); // ✅ Go back on cancel
  }
}
