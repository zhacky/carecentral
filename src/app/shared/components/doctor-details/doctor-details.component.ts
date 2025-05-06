import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DoctorService} from '../../../core/services/doctor.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  standalone: true,
  styleUrl: './doctor-details.component.css',
})

export class DoctorDetailsComponent implements OnInit {
  personalInfo = {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
  };

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  goBack() {
    window.history.back(); // Or use router.navigate(['/your-route']);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(id).subscribe({
      next: (data) => {
        this.personalInfo = data;
      },
      error: (err) => {
        console.error('Error fetching doctor:', err);
      }
    });
  }
}
