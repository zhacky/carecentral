import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  imports: [CommonModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  patient = {
    name: 'Amina Mahdi',
    id: 'HSP-102938',
    admissionDate: '2025-04-27',
    room: 'Room 305'
  };

  services = [
    { description: 'Doctor Consultation', quantity: 1, price: 100 },
    { description: 'X-Ray', quantity: 1, price: 150 },
    { description: 'Blood Test', quantity: 2, price: 50 },
    { description: 'Medication', quantity: 5, price: 20 },
    { description: 'Room Charges (per day)', quantity: 3, price: 200 }
  ];

  get totalAmount(): number {
    return this.services.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  processPayment() {
    alert(`Payment of $${this.totalAmount.toFixed(2)} has been processed.`);
  }
}
