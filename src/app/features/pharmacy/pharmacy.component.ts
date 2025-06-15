import { Component } from '@angular/core';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {InventoryItem} from '../../core/models/inventory-item.model';
import {HttpErrorResponse} from '@angular/common/http';
import {InventoryService} from '../../core/services/inventory.service';
import {map, Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-pharmacy',
  imports: [
    CurrencyPipe,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatTable,
    MatIcon,
    MatInput,
    MatButton,
    MatColumnDef,
    MatCell,
    MatHeaderCell,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    AsyncPipe,
    MatOption
  ],
  templateUrl: './pharmacy.component.html',
  styleUrl: './pharmacy.component.css'
})
export class PharmacyComponent {
  inventoryItems: InventoryItem[] = [];
  salesForm: FormGroup;
  cartItems: any[] = [];
  displayedColumns: string[] = ['item', 'quantity', 'price', 'total', 'actions'];
  filteredItems: Observable<InventoryItem[]>;

  constructor(private fb: FormBuilder,private inventoryService: InventoryService) {
    this.salesForm = this.fb.group({
      searchProduct: [''],
      quantity: [1]
    });
    this.filteredItems = this.salesForm.get('searchProduct')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }

  ngOnInit(): void {
    this.loadInventory();
    this.filteredItems = this.salesForm.get('searchProduct')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): InventoryItem[] {
    const filterValue = value.toLowerCase();
    return this.inventoryItems.filter(item =>
      item.inventoryName.toLowerCase().includes(filterValue));
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

  addToCart() {

  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
