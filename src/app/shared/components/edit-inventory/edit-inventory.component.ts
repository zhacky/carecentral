import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {InventoryItem} from '../../../core/models/inventory-item.model';
import {InventoryService} from '../../../core/services/inventory.service';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class EditInventoryComponent implements OnInit {
  inventoryItem: InventoryItem = {
    inventoryId: 0,
    inventoryName: '',
    quantity: 0,
    price: 0,
    expirationDate: new Date(),
  };

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if (id) {
      this.inventoryService.getInventoryById(id).subscribe((item) => {
        this.inventoryItem = item;
      });
    }
  }

  updateInventory(): void {
    this.inventoryService.updateInventory(this.inventoryItem.inventoryId, this.inventoryItem).subscribe(() => {
      this.snackBar.open('Inventory updated successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/common/inventory']); // ✅ Redirect after update
    });
  }

  cancel(): void {
    this.router.navigate(['/common/inventory']); // ✅ Go back on cancel
  }
}
