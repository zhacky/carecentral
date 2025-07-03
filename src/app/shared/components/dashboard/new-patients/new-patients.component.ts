import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../../core/models/patient.model';
import {PatientService} from '../../../../core/services/patient.service';
import {DashboardItemComponent} from '../dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-new-patients',
  imports: [
    DashboardItemComponent
  ],
  templateUrl: './new-patients.component.html',
  styleUrl: './new-patients.component.css'
})
export class NewPatientsComponent implements OnInit {
  tableItems: Patient[] = []; // Now holds real patient data
  searchQueryPatient = ''; // Store the search query

  constructor(
    private patientService: PatientService,
  ) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.tableItems = patients;
      },
      error: (err) => {
        console.error('Failed to fetch patients:', err);
      }
    });
  }

  // Getter for filtered items based on search query
  get filteredItems() {
    return this.tableItems.filter(
      (item) =>
        item.firstName
          .toLowerCase()
          .includes(this.searchQueryPatient.toLowerCase()) ||
        String(item.patientId)
          .toLowerCase()
          .includes(this.searchQueryPatient.toLowerCase()) ||
        // Replace 'medicalCondition' with an existing property, e.g., 'lastName'
        item.lastName
          .toLowerCase()
          .includes(this.searchQueryPatient.toLowerCase()),
    );
  }
}
