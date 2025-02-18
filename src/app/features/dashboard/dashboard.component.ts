import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [NgClass, NgForOf, FormsModule],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchQuery: string = ''; // Store the search query
  filterStatus: string = ''; // Store the selected filter status

  tableItems = [
    { patientId: "P001", name: "John Doe", dob: "1985-06-15", gender: "Male", phone: "(555) 123-4567", medicalCondition: "Hypertension" },
    { patientId: "P002", name: "Jane Smith", dob: "1990-11-20", gender: "Female", phone: "(555) 234-5678", medicalCondition: "Diabetes" },
    { patientId: "P003", name: "Michael Johnson", dob: "1982-07-30", gender: "Male", phone: "(555) 345-6789", medicalCondition: "Asthma" },
    { patientId: "P004", name: "Emily Davis", dob: "1975-03-10", gender: "Female", phone: "(555) 456-7890", medicalCondition: "Chronic Fatigue" },
    { patientId: "P005", name: "David Lee", dob: "2000-05-25", gender: "Male", phone: "(555) 567-8901", medicalCondition: "Allergy" },
  ];

  doctorList = [
    {
      doctorId: 'D001',
      name: 'Dr. John Doe',
      specialization: 'Cardiologist',
      gender: 'Male',
      phone: '123-456-7890',
      email: 'johndoe@example.com',
      status: 'Active'
    },
    {
      doctorId: 'D002',
      name: 'Dr. Jane Smith',
      specialization: 'Dermatologist',
      gender: 'Female',
      phone: '987-654-3210',
      email: 'janesmith@example.com',
      status: 'Inactive'
    },
    {
      doctorId: 'D003',
      name: 'Dr. Mark Johnson',
      specialization: 'Orthopedic Surgeon',
      gender: 'Male',
      phone: '555-555-5555',
      email: 'markjohnson@example.com',
      status: 'Active'
    }
  ];

  popupIndex: number | null = null; // Track which row's popup should be displayed

  // Toggle the popup visibility
  togglePopup(index: number): void {
    this.popupIndex = this.popupIndex === index ? null : index;
  }

  // Handle edit action
  editPatient(patient: any): void {
    console.log('Edit patient:', patient);
    // Implement edit logic here
  }

  // Handle delete action
  deletePatient(patient: any): void {
    console.log('Delete patient:', patient);
    // Implement delete logic here
  }

  // Close popup when clicking outside
  closePopup(event: any): void {
    this.popupIndex = null;
  }

  // Getter for filtered items based on search query
  get filteredItems() {
    return this.tableItems.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.patientId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.medicalCondition.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get filteredDoctors() {
    return this.doctorList.filter(doctor => {
      const matchesSearchQuery = doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        doctor.doctorId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatusFilter = this.filterStatus ? doctor.status.toLowerCase() === this.filterStatus.toLowerCase() : true;

      return matchesSearchQuery && matchesStatusFilter;
    });
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
