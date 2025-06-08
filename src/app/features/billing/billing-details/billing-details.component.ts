import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '../../../core/services/billing.service';
import { Billing } from '../../../core/models/billing.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-billing-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, CurrencyPipe, MatTooltipModule],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css'
})
export class BillingDetailsComponent implements OnInit {
  billing: Billing | undefined;
  displayedColumns: string[] = ['itemName', 'itemDescription', 'billedBy', 'amount'];

  constructor(
    private route: ActivatedRoute,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    const billingId = Number(this.route.snapshot.paramMap.get('id'));
    if (billingId) {
      this.billingService.getBillingById(billingId).subscribe(billing => {
        this.billing = billing;
      });
    }
  }
}
