import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

import { LaboratoryService } from '../../../core/services/laboratory.service';
import { Laboratory } from '../../../core/models/laboratory.model';

@Component({
  selector: 'app-add-laboratory',
  templateUrl: './add-laboratory.component.html',
  styleUrls: ['./add-laboratory.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ]
})
export class AddLaboratoryComponent {
  laboratoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private laboratoryService: LaboratoryService,
    private router: Router
  ) {
    this.laboratoryForm = this.fb.group({
      testName: ['', Validators.required],
      patientName: ['', Validators.required],
      date: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.laboratoryForm.valid) {
      const laboratoryRecord: Laboratory = {
        ...this.laboratoryForm.value,
        labId: 0 // This will be assigned by the backend
      };

      this.laboratoryService.createLaboratoryRecord(laboratoryRecord).subscribe({
        next: () => {
          this.router.navigate(['/common/laboratory']);
        },
        error: (error) => {
          console.error('Error creating laboratory record:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/common/laboratory']);
  }
}
