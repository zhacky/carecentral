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
  selector: 'app-billing-add',
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
  templateUrl: './billing-add.component.html',
  styleUrls: ['./billing-add.component.css']
})
export class BillingAddComponent implements OnInit {
  billingForm!: FormGroup;
  patientId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));

    this.billingForm = this.fb.group({
      patientId: [this.patientId],
      billingDate: [new Date().toISOString().split('T')[0], Validators.required],
      totalAmount: [{ value: 0, disabled: true }],
      items: this.fb.array([])
    });
    
    this.items.valueChanges.subscribe(() => this.updateTotalAmount());
  }

  updateTotalAmount(): void {
    const total = this.items.value.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
    this.billingForm.get('totalAmount')?.setValue(total, { emitEvent: false });
  }

  get items(): FormArray {
    return this.billingForm.get('items') as FormArray;
  }

  createItem(item: BillingItem): FormGroup {
    return this.fb.group({
      itemName: [item.itemName, Validators.required],
      itemDescription: [item.itemDescription],
      billedBy: [item.billedBy, Validators.required],
      amount: [item.amount, [Validators.required, Validators.min(0)]]
    });
  }

  addItem(): void {
    const newItem: BillingItem = {
      itemId: 0,
      billingId: 0, // This will be set by the backend
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

  onCancel(): void {
    this.router.navigate(['/common/billing'], { queryParams: { patientId: this.patientId } });
  }

  onSubmit(): void {
    if (this.billingForm.valid) {
      this.billingService.createBilling(this.billingForm.getRawValue()).subscribe(() => {
        this.router.navigate(['/common/billing'], { queryParams: { patientId: this.patientId } });
      });
    }
  }
}
