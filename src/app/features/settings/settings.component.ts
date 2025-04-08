import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [NgForOf],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  roles = [
    { name: 'Administrator' },
    { name: 'Doctor' },
    { name: 'Nurse' },
    { name: 'Receptionist' },
    { name: 'Billing Staff' },
    { name: 'Lab Technician' },
  ];
}
