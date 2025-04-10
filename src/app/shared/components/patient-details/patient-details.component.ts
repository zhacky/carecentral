import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  imports: [NgForOf],
  templateUrl: './patient-details.component.html',
  standalone: true,
  styleUrl: './patient-details.component.css',
})
export class PatientDetailsComponent {
  personalInfo = {
    firstName: 'Juan',
    middleName: 'Dela',
    lastName: 'Cruz',
  };

  personalInfoList = [
    { label: 'Date of Birth', value: 'January 1, 1990' },
    { label: 'Gender', value: 'Male' },
    { label: 'Place of Birth', value: 'Quezon City' },
    { label: 'Nationality', value: 'Filipino' },
    { label: 'Civil Status', value: 'Single' },
    { label: 'Religion', value: 'Catholic' },
    { label: 'Occupation', value: 'Software Developer' },
  ];

  contactInfo = [
    { label: 'Contact Number', value: '09123456789' },
    { label: 'Email', value: 'juan@gmail.com' },
    { label: 'Address', value: 'Manila, Philippines' },
  ];

  familyInfo = [
    { label: 'Spouse Name', value: '-' },
    { label: 'Father Name', value: 'Jose Cruz' },
    { label: 'Father Address', value: 'Makati City' },
    { label: 'Mother Name', value: 'Maria Dela Cruz' },
    { label: 'Mother Address', value: 'Makati City' },
  ];

  emergencyInfo = {
    fullName: 'Juan Dela Cruz',
    address: '123 Emergency St., Manila',
  };
}
