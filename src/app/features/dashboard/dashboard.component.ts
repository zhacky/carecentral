import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgForOf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../core/services/patient.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientDto } from '../../core/models/patient.model';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgClass, NgForOf, FormsModule, MatPaginator, DatePipe, MatHeaderCell, MatCell, MatTable, MatRowDef, MatHeaderCellDef, MatCellDef, MatButton, MatColumnDef, MatHeaderRow, MatHeaderRowDef, MatRow, RouterLink],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private patientService: PatientService) {}
  searchQueryPatient: string = ''; // Store the search query
  searchQueryDoctor: string = '';
  filterStatus: string = ''; // Store the selected filter status



  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'dateOfBirth', 'gender'];

  dataSource = new MatTableDataSource<PatientDto>([]);

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (patients) => {
        // Add position dynamically
        this.dataSource.data = patients.map((patient, index) => ({
          ...patient,
          position: index + 1,  // Position starts at 1 and increments
        }));
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }


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


  // Handle delete action
  deletePatient(patient: any): void {
    console.log('Delete patient:', patient);
    // Implement delete logic here
  }

  // Close popup when clicking outside
  closePopup(event: any): void {
    this.popupIndex = null;
  }

  get filteredData() {
    return this.dataSource.data.filter(patient => {
      return (
        patient.firstName.toLowerCase().includes(this.searchQueryPatient.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(this.searchQueryPatient.toLowerCase()) ||
        patient.patientId.toString().toLowerCase().includes(this.searchQueryPatient.toLowerCase())
      );
    });
  }


  // Getter for filtered items based on search query

  get filteredDoctors() {
    return this.doctorList.filter(doctor => {
      const matchesSearchQuery = doctor.name.toLowerCase().includes(this.searchQueryDoctor.toLowerCase()) ||
        doctor.doctorId.toLowerCase().includes(this.searchQueryDoctor.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(this.searchQueryDoctor.toLowerCase());

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
