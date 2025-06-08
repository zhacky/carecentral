import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatTable, MatColumnDef, MatCell, MatCellDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef} from '@angular/material/table';
import {CurrencyPipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatTable,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgFor,
    NgIf,
    CurrencyPipe
  ],
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  patients = [
    { patientId: 1, name: 'John Doe' },
    { patientId: 2, name: 'Jane Smith' }
    // Add more patients as needed
  ];

  billingData = [
    {
      billingId: 1,
      patientId: 1,
      billingDate: "2025-06-08",
      items: [
        { itemId: 1, itemName: "X-Ray", itemDescription: "Lab", billedBy: "Hospital", amount: 1200 },
        { itemId: 2, itemName: "Blood Test", itemDescription: "Lab", billedBy: "Hospital", amount: 1000 },
        { itemId: 3, itemName: "Incredible Wool Bench", itemDescription: "Pharmacy", billedBy: "Pharmacy", amount: 22205.34 },
        { itemId: 4, itemName: "Prof. Fee", itemDescription: "Consultation", billedBy: "Milton Heller", amount: 1000 }
      ]
    },
    {
      billingId: 51,
      patientId: 1,
      billingDate: "2025-06-08",
      items: [
        { itemId: 201, itemName: "Incredible Marble Coat", itemDescription: "Special", billedBy: "Dr. Efrain", amount: 121.7 }
      ]
    }
  ];

  selectedPatientId: number | null = null;
  filteredBillings: {
    billingId: number;
    patientId: number;
    billingDate: string;
    items: {
      itemId: number;
      itemName: string;
      itemDescription: string;
      billedBy: string;
      amount: number;
    }[];
  }[] = [];

  displayedColumns: string[] = ['billingId', 'billingDate', 'items'];

  onPatientChange() {
    this.filteredBillings = this.billingData.filter(
      billing => billing.patientId === this.selectedPatientId
    );
  }
}
