import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PatientDto} from '../../../core/models/patient.model';
import {PatientService} from '../../../core/services/patient.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DoctorService} from '../../../core/services/doctor.service';
import {DoctorDto} from '../../../core/models/doctor.model';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  standalone: true
})
export class EditPatientComponent implements OnInit {
  patientDto: PatientDto = new PatientDto(
    0, // position
    0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0
  );

  doctors: DoctorDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if (id) {
      this.patientService.getPatientById(id).subscribe((item) => {
        this.patientDto = item;
      });
    }

    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (doctors) => {
        // Store fetched doctors in the `doctors` array
        this.doctors = doctors; // Now available for the dropdown
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  updatePatient(formRef: NgForm): void {

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

    this.patientService.updatePatient(this.patientDto.patientId, this.patientDto).subscribe(() => {
      alert('Patient updated successfully!'); // Optional Snackbar
      this.router.navigate(['/common/patient']); // ✅ Redirect after update
    });
  }

  cancel(): void {
    this.router.navigate(['/common/patient']); // ✅ Go back on cancel
  }
}
