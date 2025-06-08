import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-working-hours',
    imports: [
        NgForOf
    ],
  templateUrl: './working-hours.component.html',
  styleUrl: './working-hours.component.css'
})
export class WorkingHoursComponent {

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
}
