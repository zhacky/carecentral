import { Component } from '@angular/core';
import { InventoryService } from '../../../core/services/inventory.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restock-inventory',
  imports: [
    FormsModule
  ],
  templateUrl: './restock-inventory.component.html',
  standalone: true,
  styleUrl: './restock-inventory.component.css'
})
export class RestockInventoryComponent {
  itemId: number = 0;
  restockQuantity: number = 0;

  constructor(private inventoryService: InventoryService) {}

  restockItem(): void {
    if (this.itemId && this.restockQuantity > 0) {
      this.inventoryService.restockItem(this.itemId, this.restockQuantity);
      alert(`Restocked item with ID: ${this.itemId} by ${this.restockQuantity}`);
    } else {
      alert('Please provide valid item ID and quantity');
    }
  }
}
