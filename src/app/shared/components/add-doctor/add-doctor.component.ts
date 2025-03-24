import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorDto, DoctorStatus} from '../../../core/models/doctor.model';
import {DoctorService} from '../../../core/services/doctor.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class AddDoctorComponent {
  doctorItem: DoctorDto = {
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
    private router: Router
  ) {}

  saveDoctor(): void {
    this.doctorService.createDoctor(this.doctorItem).subscribe(() => {
      alert('Doctor added successfully!'); // Optional Snackbar
      this.router.navigate(['/common/doctor']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/doctor']); // ✅ Go back on cancel
  }

  protected readonly DoctorDto = DoctorDto;
}
