import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Billing } from '../../../core/models/billing.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-billing-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe
  ],
  templateUrl: './billing-details-dialog.component.html',
  styleUrl: './billing-details-dialog.component.css'
})
export class BillingDetailsDialogComponent {
  displayedColumns: string[] = ['itemName', 'itemDescription', 'billedBy', 'amount'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Billing) {}
}
