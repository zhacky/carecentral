import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Doctor, DoctorStatus} from '../../../core/models/doctor.model';
import {DoctorService} from '../../../core/services/doctor.service';
import {FormsModule, NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  standalone: true
})
export class AddDoctorComponent {
  doctorItem: Doctor = {
    position: 0,
    doctorId: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    status: DoctorStatus.ACTIVE,
  };

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  saveDoctor(formRef: NgForm): void {

    if (this.formRef.invalid) {
      // Mark all controls as touched to show validation errors
      Object.values(this.formRef.controls).forEach(control => {
        control.markAsTouched();
      });

      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });

      return; // Stop here if form is invalid
    }

    this.doctorService.createDoctor(this.doctorItem).subscribe(() => {
      this.snackBar.open('Doctor added successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/common/doctor']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/doctor']); // ✅ Go back on cancel
  }

  protected readonly DoctorDto = Doctor;
}
