import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../core/services/patient.service';
import { PatientDto } from '../../../core/models/patient.model';
import { NgForOf, NgIf } from '@angular/common';

interface InfoItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [NgForOf, NgIf],
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

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  goBack() {
    window.history.back(); // Or use router.navigate(['/your-route']);
  }

  printPdf(type: 'patient' | 'emergency' | 'surgicalTreatment') {
    this.showDropdown = false;
    const patientId = this.patientId; // make sure this ID is available

    const handleBlob = (blob: Blob, filename: string) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    };

    if (type === 'patient') {
      this.patientService.printPatientDataSheetPdf(patientId).subscribe(blob => {
        handleBlob(blob, `PatientDataSheet_${this.personalInfo.firstName + this.personalInfo.lastName}.pdf`);
      });
    } else if (type === 'emergency') {
      this.patientService.printEmergencyRoomPdf(patientId).subscribe(blob => {
        handleBlob(blob, `EmergencyRoomPatient_${this.personalInfo.firstName + this.personalInfo.lastName}.pdf`);
      });
    } else if (type == 'surgicalTreatment') {
      this.patientService.printAuthorizationSurgicalTreatmentPdf(patientId).subscribe(blob => {
        handleBlob(blob, `AuthorizationSurgicalTreatment_${this.personalInfo.firstName + this.personalInfo.lastName}.pdf`);
      })
    }
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.patientId = id;

      this.patientService.getPatientById(id).subscribe({
        next: (patient: PatientDto) => {
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
    }
  }
}
