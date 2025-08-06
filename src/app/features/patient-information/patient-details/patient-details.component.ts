import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';
import { NgForOf, NgIf } from '@angular/common';
import {PatientRecord} from '../../../core/models/patient-record.model';
import {PatientRecordService} from '../../../core/services/patient-record.service';
import {AddRecordModalComponent} from './add-record-modal/add-record-modal.component';

interface InfoItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [NgForOf, NgIf, AddRecordModalComponent],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
})
export class PatientDetailsComponent implements OnInit {
  personalInfo = { firstName: '', middleName: '', lastName: '' };
  personalInfoList: InfoItem[] = [];
  contactInfo: InfoItem[] = [];
  familyInfo: InfoItem[] = [];
  emergencyInfo = { fullName: '', address: '' };
  patientId!: number;
  selectedTab = 'patientInformation';
  showDropdown = false;
  patientRecords: PatientRecord[] = [];
  showAddRecordModal = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private patientRecordService: PatientRecordService
  ) {}

  tabs = [
    {key: 'patientInformation', label: 'Patient Information', icon: 'fa fa-user',},
    {key: 'patientRecords', label: 'Patient Records', icon: 'fa fa-book',},
    {key: 'patientPhilhealth', label: 'PhilHealth', icon: 'fa fa-medkit',},
    {key: 'patientChart', label: 'PatientChart', icon: 'fa fa-wifi',},
  ];


  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  goBack() {
    window.history.back(); // Or use router.navigate(['/your-route']);
  }

  printPdf(type: 'patient' | 'emergency' | 'surgicalTreatment') {
    this.showDropdown = false;
    const patientId = this.patientId; // make sure this ID is available

    const openPdfPreview = (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); // Open PDF in new tab
    };

    if (type === 'patient') {
      this.patientService.printPatientDataSheetPdf(patientId).subscribe(blob => {
        // handleBlob(blob, `PatientDataSheet_${this.personalInfo.firstName + this.personalInfo.lastName}.pdf`);
        openPdfPreview(blob);
      });
    } else if (type === 'emergency') {
      this.patientService.printEmergencyRoomPdf(patientId).subscribe(blob => {
        // handleBlob(blob, `EmergencyRoomPatient_${this.personalInfo.firstName + this.personalInfo.lastName}.pdf`);
        openPdfPreview(blob);
      });
    } else if (type == 'surgicalTreatment') {
      this.patientService.printAuthorizationSurgicalTreatmentPdf(patientId).subscribe(blob => {
        // handleBlob(blob, `AuthorizationSurgicalTreatment_${this.personalInfo.firstName + this.personalInfo.lastName}.pdf`);
        openPdfPreview(blob);
      })
    }
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.patientId = id;

      this.patientService.getPatientById(id).subscribe({
        next: (patient: Patient) => {
          this.personalInfo = {
            firstName: patient.firstName,
            middleName: patient.middleName,
            lastName: patient.lastName,
          };

          this.personalInfoList = [
            { label: 'Date of Birth', value: `${patient.dateOfBirth}` },
            { label: 'Gender', value: `${patient.gender}` },
            { label: 'Place of Birth', value: `${patient.placeOfBirth}` },
            { label: 'Nationality', value: `${patient.nationality}` },
            { label: 'Civil Status', value: `${patient.civilStatus}` },
            { label: 'Religion', value: `${patient.religion}` },
            { label: 'Occupation', value: `${patient.occupation}` },
          ];

          this.contactInfo = [
            { label: 'Contact Number', value: `${patient.contactNumber}` },
            { label: 'Email', value: `${patient.email}` },
            { label: 'Address', value: `${patient.address}` },
          ];

          this.familyInfo = [
            { label: 'Spouse Name', value: `${patient.spouseName || '-'}` },
            { label: 'Father Name', value: `${patient.fatherName}` },
            { label: 'Father Address', value: `${patient.fatherAddress}` },
            { label: 'Mother Name', value: `${patient.motherName}` },
            { label: 'Mother Address', value: `${patient.motherAddress}` },
          ];

          this.emergencyInfo = {
            fullName: patient.toNotifyName,
            address: patient.toNotifyAddress,
          };
        },
        error: (err) => {
          console.error('Failed to load patient:', err);
        },
      });
      this.patientRecordService.getPatientRecordsForPatient(id).subscribe({
        next: (records: PatientRecord[]) => {
          this.patientRecords = records;
        },
        error: (err) => {
          console.error('Failed to load patient records:', err);
        },
      });
    }
  }


  editPersonalInfo() {
    // go to /patient/edit/:id
    const id = this.patientId;
    if (id) {
      window.location.href = `/common/patient/edit/${id}`;
    } else {
      console.error('Patient ID is not available for editing.');
    }
  }

  addRecord() {
    this.showAddRecordModal = true;
  }

  closeAddRecordModal() {
    this.showAddRecordModal = false;
  }
  saveNewRecord(newRecord: PatientRecord) {
    // Optionally, call a service to persist the new record
    if (this.patientId !== null && this.patientId !== undefined) {
      this.patientRecordService.addPatientRecord(this.patientId, newRecord).subscribe({
        next: (record) => {
          this.patientRecords.push(record);
          this.showAddRecordModal = false;
        },
        error: (err) => {
          console.error('Failed to save new record:', err);
        }
      });
    }
    // this.patientRecords.push(newRecord);
    this.showAddRecordModal = false;
  }
}
