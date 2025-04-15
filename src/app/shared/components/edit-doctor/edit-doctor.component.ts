import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DoctorDto, DoctorStatus} from '../../../core/models/doctor.model';
import {DoctorService} from '../../../core/services/doctor.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  imports: [
    FormsModule,
    NgClass
  ],
  standalone: true
})
export class EditDoctorComponent implements OnInit {
  doctorDto: {
    doctorId: number;
    firstName: string;
    lastName: string;
    address: string;
    gender: string;
    contactNumber: string;
    middleName: string;
    dateOfBirth: string;
    email: string;
    status: DoctorStatus
  } = {
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
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if (id) {
      this.doctorService.getDoctorById(id).subscribe((item) => {
        this.doctorDto = item;
      });
    }
  }

  updateDoctor(formRef: NgForm): void {

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

    this.doctorService.updateDoctor(this.doctorDto.doctorId, this.doctorDto).subscribe(() => {
      alert('Doctor updated successfully!'); // Optional Snackbar
      this.router.navigate(['/common/doctor']); // ✅ Redirect after update
    });
  }

  cancel(): void {
    this.router.navigate(['/common/doctor']); // ✅ Go back on cancel
  }
}
