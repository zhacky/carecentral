import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-details',
  imports: [],
  templateUrl: './doctor-details.component.html',
  standalone: true,
  styleUrl: './doctor-details.component.css',
})
export class DoctorDetailsComponent {
  personalInfo = {
    firstName: 'Emily',
    middleName: 'Grace',
    lastName: 'Smith',
    dateOfBirth: '1990-06-15',
    gender: 'Female',
    contactNumber: '(123) 456-7890',
    email: 'emily.smith@example.com',
    address: '123 Main Street, Springfield, IL, USA',
  };
}
