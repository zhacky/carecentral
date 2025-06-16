import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {InventoryItem} from '../../core/models/inventory-item.model';
import {HttpErrorResponse} from '@angular/common/http';
import {InventoryService} from '../../core/services/inventory.service';
import {PharmacyService} from '../../core/services/pharmacy.service';
import {CartItem, PharmacySale} from '../../core/models/pharmacy.model';
import {map, Observable, startWith} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

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
    MatOption,
    MatPaginator
  ],
  templateUrl: './pharmacy.component.html',
  styleUrl: './pharmacy.component.css'
})
export class PharmacyComponent implements AfterViewInit, OnInit {
  inventoryItems: InventoryItem[] = [];
  salesForm: FormGroup;
  cartItems: CartItem[] = [];
  displayedColumns: string[] = ['item', 'quantity', 'price', 'total', 'actions'];
  filteredItems: Observable<InventoryItem[]>;
  dataSource = new MatTableDataSource<CartItem>();
  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private pharmacyService: PharmacyService,
    private cdr: ChangeDetectorRef,
  ) {
    this.salesForm = this.fb.group({
      searchProduct: [''],
      quantity: [1]
    });
    this.filteredItems = this.salesForm.get('searchProduct')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadInventory();
    this.filteredItems = this.salesForm.get('searchProduct')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.dataSource.data = this.cartItems;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
    const productName = this.salesForm.get('searchProduct')?.value;
    const quantity = this.salesForm.get('quantity')?.value;

    if (!productName || !quantity) {
      alert('Please select a product and quantity');
      return;
    }

    // Find the selected inventory item
    const inventoryItem = this.inventoryItems.find(item =>
      item.inventoryName.toLowerCase() === productName.toLowerCase());

    if (!inventoryItem) {
      alert('Product not found in inventory');
      return;
    }

    // Check if there's enough quantity in inventory
    if (inventoryItem.quantity < quantity) {
      alert(`Not enough stock. Only ${inventoryItem.quantity} available.`);
      return;
    }

    // Check if item already exists in cart
    const existingItemIndex = this.cartItems.findIndex(item =>
      item.inventoryId === inventoryItem.inventoryId);

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      this.cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const cartItem: CartItem = {
        inventoryId: inventoryItem.inventoryId,
        name: inventoryItem.inventoryName,
        quantity: quantity,
        price: inventoryItem.price
      };
      this.cartItems.push(cartItem);
    }
    console.log("cart items: ", this.cartItems);
    this.dataSource.data = this.cartItems;
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
    // Reset form
    this.salesForm.patchValue({
      searchProduct: '',
      quantity: 1
    });

  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.dataSource.data = this.cartItems;
    this.cdr.detectChanges();
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  completeSale(): void {
    if (this.cartItems.length === 0) {
      alert('Cart is empty. Please add items before checkout.');
      return;
    }

    // Create a sale object
    const sale: PharmacySale = {
      saleDate: new Date().toISOString(),
      items: [...this.cartItems],
      totalAmount: this.getTotalAmount(),
      paymentMethod: 'CASH', // Default payment method
      paymentStatus: 'PENDING'
    };

    // Create the sale in the backend
    this.pharmacyService.createSale(sale).subscribe({
      next: (createdSale) => {
        // Process payment
        this.pharmacyService.processPayment(
          createdSale.saleId!,
          'CASH',
          createdSale.totalAmount
        ).subscribe({
          next: (updatedSale) => {
            // Update inventory quantities
            const inventoryUpdates = this.cartItems.map(item => ({
              inventoryId: item.inventoryId,
              quantity: item.quantity
            }));

            this.pharmacyService.updateInventoryAfterSale(inventoryUpdates).subscribe({
              next: () => {
                // Generate receipt
                this.pharmacyService.generateReceipt(updatedSale.saleId!).subscribe({
                  next: (receipt) => {
                    alert('Sale completed successfully! Receipt generated.');
                    console.log('Receipt:', receipt);
                    // Clear cart
                    this.cartItems = [];
                    this.dataSource.data = this.cartItems;
                    this.cdr.detectChanges();
                  },
                  error: (err) => {
                    console.error('Error generating receipt:', err);
                    alert('Sale completed but failed to generate receipt.');
                  }
                });
              },
              error: (err) => {
                console.error('Error updating inventory:', err);
                alert('Sale completed but failed to update inventory.');
              }
            });
          },
          error: (err) => {
            console.error('Error processing payment:', err);
            alert('Failed to process payment.');
          }
        });
      },
      error: (err) => {
        console.error('Error creating sale:', err);
        alert('Failed to complete sale.');
      }
    });
  }
}
