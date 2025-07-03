import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PatientvisitComponent} from './patientvisit/patientvisit.component';
import {EarningsComponent} from '../../shared/components/dashboard/earnings/earnings.component';
import {NewPatientsComponent} from '../../shared/components/dashboard/new-patients/new-patients.component';
import {AvailableBedsComponent} from '../../shared/components/dashboard/available-beds/available-beds.component';
import {QuickLinksComponent} from '../../shared/components/dashboard/quick-links/quick-links.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    MatSidenavModule,
    PatientvisitComponent,
    EarningsComponent,
    NewPatientsComponent,
    AvailableBedsComponent,
    QuickLinksComponent
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(

  ) {}



  ngOnInit(): void {


  }
  searchQueryPatient = ''; // Store the search query
  searchQueryDoctor = '';
  filterStatus = ''; // Store the selected filter status
  isNavOpen = true; // Default: open

  doctorList = [
    {
      doctorId: 'D001',
      name: 'Dr. John Doe',
      specialization: 'Cardiologist',
      gender: 'Male',
      phone: '123-456-7890',
      email: 'johndoe@example.com',
      status: 'Active',
    },
    {
      doctorId: 'D002',
      name: 'Dr. Jane Smith',
      specialization: 'Dermatologist',
      gender: 'Female',
      phone: '987-654-3210',
      email: 'janesmith@example.com',
      status: 'Inactive',
    },
    {
      doctorId: 'D003',
      name: 'Dr. Mark Johnson',
      specialization: 'Orthopedic Surgeon',
      gender: 'Male',
      phone: '555-555-5555',
      email: 'markjohnson@example.com',
      status: 'Active',
    },
  ];

  popupIndex: number | null = null; // Track which row's popup should be displayed



  get filteredDoctors() {
    return this.doctorList.filter((doctor) => {
      const matchesSearchQuery =
        doctor.name
          .toLowerCase()
          .includes(this.searchQueryDoctor.toLowerCase()) ||
        doctor.doctorId
          .toLowerCase()
          .includes(this.searchQueryDoctor.toLowerCase()) ||
        doctor.specialization
          .toLowerCase()
          .includes(this.searchQueryDoctor.toLowerCase());

      const matchesStatusFilter = this.filterStatus
        ? doctor.status.toLowerCase() === this.filterStatus.toLowerCase()
        : true;

      return matchesSearchQuery && matchesStatusFilter;
    });
  }



  // Toggle the popup visibility
  togglePopup(index: number): void {
    this.popupIndex = this.popupIndex === index ? null : index;
  }

  // Handle delete action
  deletePatient(patient: any): void {
    console.log('Delete patient:', patient);
    // Implement delete logic here
  }

  // Close popup when clicking outside
  closePopup(event: any): void {
    console.log`Event: ${event.detail}`;
    this.popupIndex = null;
  }

  // Handle edit action
  editDoctor(doctor: any): void {
    console.log('Edit doctor:', doctor);
    // Implement edit logic here
  }

  // Handle delete action
  deleteDoctor(doctor: any): void {
    console.log('Delete doctor:', doctor);
    // Implement delete logic here
  }
}
