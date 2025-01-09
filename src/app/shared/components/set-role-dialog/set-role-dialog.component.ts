import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-set-role-dialog',
  imports: [MatFormFieldModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, CommonModule, MatInputModule ],
  standalone: true,
  templateUrl: './set-role-dialog.component.html',
  styleUrls: ['./set-role-dialog.component.css'],
})
export class SetRoleDialogComponent {
  editForm: FormGroup;
  roles: string[] = ['Admin', 'Doctor', 'Nurse', 'Receptionist', 'Billing Staff'];

  constructor(
    public dialogRef: MatDialogRef<SetRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: [{ value: data.name, disabled: true }, Validators.required],
      role: [data.role, Validators.required],
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}