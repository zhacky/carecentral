import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../core/services/billing.service';
import { Billing } from '../../core/models/billing.model';

@Component({
  selector: 'app-billing',
  imports: [CommonModule ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit {
  billings: Billing[] = [];

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.getBillings().subscribe(
      (data: Billing[]) => {
        this.billings = data;
 console.log(this.billings)
      },
      (error: any) => {
        console.error('Error fetching billings:', error);
      }
    );
  }
  calculateTotal(services: { name: string; price: number; quantity: number }[]): number {
    return services.reduce((total, service) => total + (service.price * service.quantity), 0);
  }
  processPayment(): void {
    console.log('Processing payment...');
  }
}
