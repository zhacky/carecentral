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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

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
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './billing-edit.component.html',
  styleUrls: ['./billing-edit.component.css']
})
export class BillingEditComponent implements OnInit {
  billingForm!: FormGroup;
  billingId!: number;
  patientIdForRedirect: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private billingService: BillingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.billingId = Number(this.route.snapshot.paramMap.get('id'));
    const patientId = this.route.snapshot.queryParamMap.get('patientId');
    if (patientId) {
        this.patientIdForRedirect = Number(patientId);
    }

    this.billingForm = this.fb.group({
      billingId: [{ value: '', disabled: true }],
      patientId: [{ value: '', disabled: true }],
      billingDate: ['', Validators.required],
      totalAmount: [{ value: 0, disabled: true }],
      items: this.fb.array([])
    });

    if (this.billingId) {
      this.billingService.getBillingById(this.billingId).subscribe(billing => {
        this.billingForm.patchValue(billing);
        this.billingForm.setControl('items', this.fb.array(billing.items.map(item => this.createItem(item))));
        this.updateTotalAmount();
      });
    }
    
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Billing Item',
        message: 'Are you sure you want to delete this item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.items.removeAt(index);
      }
    });
  }

  onSubmit(): void {
    if (this.billingForm.valid) {
      this.billingService.updateBilling(this.billingId, this.billingForm.getRawValue()).subscribe(() => {
        if(this.patientIdForRedirect) {
            this.router.navigate(['/common/billing'], { queryParams: { patientId: this.patientIdForRedirect } });
        } else {
            this.router.navigate(['/common/billing']);
        }
      });
    }
  }

  onCancel(): void {
    if (this.patientIdForRedirect) {
      this.router.navigate(['/common/billing'], { queryParams: { patientId: this.patientIdForRedirect } });
    } else {
      this.router.navigate(['/common/billing']);
    }
  }
}
