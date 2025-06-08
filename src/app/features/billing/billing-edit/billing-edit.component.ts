import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { BillingService } from '../../../core/services/billing.service';
import { Billing, BillingItem } from '../../../core/models/billing.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-billing-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './billing-edit.component.html',
  styleUrls: ['./billing-edit.component.css']
})
export class BillingEditComponent implements OnInit {
  billingForm!: FormGroup;
  billingId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    this.billingId = Number(this.route.snapshot.paramMap.get('id'));
    this.billingForm = this.fb.group({
      billingId: [{ value: '', disabled: true }],
      patientId: [{ value: '', disabled: true }],
      billingDate: ['', Validators.required],
      totalAmount: [{ value: '', disabled: true }],
      items: this.fb.array([])
    });

    if (this.billingId) {
      this.billingService.getBillingById(this.billingId).subscribe(billing => {
        this.billingForm.patchValue(billing);
        billing.items.forEach(item => {
          this.items.push(this.createItem(item));
        });
      });
    }
  }

  get items(): FormArray {
    return this.billingForm.get('items') as FormArray;
  }

  createItem(item: BillingItem): FormGroup {
    return this.fb.group({
      itemId: [item.itemId],
      billingId: [item.billingId],
      billingItemDate: [item.billingItemDate, Validators.required],
      itemName: [item.itemName, Validators.required],
      itemDescription: [item.itemDescription],
      billedBy: [item.billedBy, Validators.required],
      amount: [item.amount, [Validators.required, Validators.min(0)]]
    });
  }

  addItem(): void {
    const newItem: BillingItem = {
      itemId: 0,
      billingId: this.billingId,
      billingItemDate: new Date().toISOString().split('T')[0],
      itemName: '',
      itemDescription: '',
      billedBy: '',
      amount: 0
    };
    this.items.push(this.createItem(newItem));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.billingForm.valid) {
      this.billingService.updateBilling(this.billingId, this.billingForm.getRawValue()).subscribe(() => {
        this.router.navigate(['/common/billing']);
      });
    }
  }
}
