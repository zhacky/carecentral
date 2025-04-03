import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-patientdata',
  imports: [NgClass, NgForOf],
  templateUrl: './patientdata.component.html',
  standalone: true,
  styleUrl: './patientdata.component.css',
})
export class PatientdataComponent {
  patients = [
    {
      name: 'Jenny Wilson',
      date: 'Dec 18, 2021',
      symptoms: 'Geriatrician',
      status: 'Confirmed',
    },
    {
      name: 'Albert Flores',
      date: 'Dec 18, 2021',
      symptoms: 'Internist',
      status: 'Incoming',
    },
    {
      name: 'Floyd Miles',
      date: 'Dec 18, 2021',
      symptoms: 'Urogynecologist',
      status: 'Confirmed',
    },
    {
      name: 'Marvin McKinney',
      date: 'Dec 18, 2021',
      symptoms: 'Cardiologist',
      status: 'Cancelled',
    },
  ];
}
