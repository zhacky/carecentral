import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

interface Appointment {
  name: string;
  doctor: string;
  gender: string;
  date: string;
  time: string;
  mobile: string;
  email: string;
  status: 'Completed' | 'Scheduled' | 'Canceled';
  visitType: 'New Patient' | 'Follow-Up';
}

@Component({
  selector: 'app-view-appointment',
  imports: [NgClass, NgForOf],
  templateUrl: './view-appointment.component.html',
  standalone: true,
  styleUrl: './view-appointment.component.css',
})
export class ViewAppointmentComponent {
  appointments: Appointment[] = [
    {
      name: 'Cara Stev...',
      doctor: 'Dr.Rajesh',
      gender: 'female',
      date: '11/18/2024',
      time: '09:00',
      mobile: '1234567...',
      email: 'cara.ste...',
      status: 'Completed',
      visitType: 'New Patient',
    },
    {
      name: 'John Doe',
      doctor: 'Dr.Sarah Sm...',
      gender: 'male',
      date: '11/22/2024',
      time: '11:30',
      mobile: '9876543...',
      email: 'john.doe...',
      status: 'Canceled',
      visitType: 'Follow-Up',
    },
    {
      name: 'Alice John...',
      doctor: 'Dr.Jay Soni',
      gender: 'female',
      date: '11/14/2024',
      time: '09:45',
      mobile: '2345678...',
      email: 'alice.j@e...',
      status: 'Scheduled',
      visitType: 'New Patient',
    },
    {
      name: 'Bob Brown',
      doctor: 'Dr.Pooja Patel',
      gender: 'male',
      date: '11/19/2024',
      time: '13:15',
      mobile: '3456789...',
      email: 'bob.bro...',
      status: 'Canceled',
      visitType: 'New Patient',
    },
    {
      name: 'Sara Lee',
      doctor: 'Dr.Jayesh S...',
      gender: 'female',
      date: '11/21/2024',
      time: '10:30',
      mobile: '4567890...',
      email: 'sara.lee...',
      status: 'Completed',
      visitType: 'Follow-Up',
    },
    {
      name: 'Tom Harris',
      doctor: 'Dr.Sarah Sm...',
      gender: 'male',
      date: '11/13/2024',
      time: '14:15',
      mobile: '5678901...',
      email: 'tom.harr...',
      status: 'Scheduled',
      visitType: 'New Patient',
    },
    {
      name: 'Emma Wil...',
      doctor: 'Dr.Rajesh',
      gender: 'female',
      date: '11/18/2024',
      time: '16:45',
      mobile: '6789012...',
      email: 'emma.w...',
      status: 'Completed',
      visitType: 'Follow-Up',
    },
  ];
}
