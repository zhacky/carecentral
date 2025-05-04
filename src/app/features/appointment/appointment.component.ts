import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  imports: [FormsModule],
  templateUrl: './appointment.component.html',
  standalone: true,
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  appointment = {
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  };

  doctors = [
    'Dr. Fatima Alawi - Pediatrics',
    'Dr. Omar Qureshi - Cardiology',
    'Dr. Layla Hassan - Internal Medicine',
    'Dr. Yusuf Salim - Orthopedics'
  ];

  submitAppointment() {
    alert(`Appointment booked for ${this.appointment.patientName} with ${this.appointment.doctor} on ${this.appointment.date} at ${this.appointment.time}.`);
    // Reset form (optional)
    this.appointment = {
      patientName: '',
      doctor: '',
      date: '',
      time: '',
      reason: ''
    };
  }
}
