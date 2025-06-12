import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Philhealth} from '../../../core/models/philhealth.model';
import {PhilhealthService} from '../../../core/services/philhealth.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {PatientService} from '../../../core/services/patient.service';
import {Patient} from '../../../core/models/patient.model';

@Component({
  selector: 'app-add-philhealth',
  templateUrl: './add-philhealth.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatInput
  ],
  standalone: true
})
export class AddPhilhealthComponent {
  selectedPatientId: number = 0;
  philhealthItem : {
    bloodPressure: string;
    signAndSymptoms: string[] | any;
    dateAdmitted: string;
    memPIN: string;
    patPertinentPastMedicalHistory: string;
    memFirstName: string;
    abdomen: string[] | any;
    chiefComplaint: string;
    extremities: string[];
    patMiddleName: string;
    firstCaseRateCode: string;
    patHeight: number;
    temperature: number;
    courseInTheWards: string;
    patPIN: string;
    lungs: string[] | any;
    memDateOfBirth: string;
    timeAdmitted: string;
    memLastName: string;
    cvs: string[] | any;
    dischargeDiagnosis: string;
    generalSurvey: string[] | any;
    respiratoryRate: number;
    heent: string[] | any;
    secondCaseRateCode: string;
    neuroExam: string[];
    patSex: string;
    timeDischarged: string;
    gu: string[] | any;
    philhealthId: number;
    diagnosticFindings: string;
    patDateOfBirth: string;
    patWeight: number;
    heartRate: number;
    relationToMember: string;
    patAge: number;
    memMiddleName: string;
    dateDischarged: string;
    patPresentHistoryOfIllness: string;
    patLastName: string;
    treatmentOutcome: string | '';
    capillaryRefill: string;
    patFirstName: string;
    admittingDiagnosis: string
  } = {
    philhealthId: 0,

    patFirstName: '',
    patMiddleName: '',
    patLastName: '',

    memFirstName: '',
    memMiddleName: '',
    memLastName: '',

    patPIN: '',
    memPIN: '',
    relationToMember: '',

    patDateOfBirth: '',
    memDateOfBirth: '',

    patAge: 0,
    patSex: '',
    patHeight: 0,
    patWeight: 0,

    chiefComplaint: '',
    admittingDiagnosis: '',
    dischargeDiagnosis: '',

    firstCaseRateCode: '',
    secondCaseRateCode: '',

    dateAdmitted: '',
    timeAdmitted: '',
    dateDischarged: '',
    timeDischarged: '',

    patPresentHistoryOfIllness: '',
    patPertinentPastMedicalHistory: '',
    treatmentOutcome: '',

    bloodPressure: '',
    capillaryRefill: '',
    heartRate: 0,
    respiratoryRate: 0,
    temperature: 0,

    courseInTheWards: '',
    diagnosticFindings: '',

    // Multiple input fields
    signAndSymptoms: [],
    generalSurvey: [],
    heent: [],
    lungs: [],
    cvs: [],
    abdomen: [],
    gu: [],
    extremities: [],
    neuroExam: []
  };
  patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    private philhealthService: PhilhealthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  currentStep = 1;
  totalSteps = 5; // Update this if you add more steps

  symptomsInput = '';
  generalSurveyInput = '';
  heentInput = '';
  lungsInput = '';
  cvsInput = '';
  abdomenInput = '';
  guInput = '';
  extremitiesInput = '';
  neuroExamInput = '';

  nextStep() {
    const invalidFields = this.getInvalidFieldsForStep(this.currentStep);

    if (invalidFields.length > 0) {
      // Mark them as touched
      invalidFields.forEach(fieldName => {
        const control = this.formRef.controls[fieldName];
        if (control) control.markAsTouched();
      });

      this.snackBar.open('Please fill in all required fields before proceeding.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });

      return; // Prevent going to next step
    }

    this.currentStep++;
  }

  getInvalidFieldsForStep(step: number): string[] {
    // Adjust these based on actual fields in your step layout
    const stepFields: Record<number, string[]> = {
      1: ['memFirstName', 'memLastName', 'memPIN', 'memDateOfBirth'], // Example fields in Step 1
      2: ['patFirstName', 'patLastName', 'patDateOfBirth', 'patPIN', 'relationToMember', 'patSex'] // Example fields in Step 2
    };

    const fieldsToCheck = stepFields[step] || [];
    return fieldsToCheck.filter(field => {
      const control = this.formRef.controls[field];
      return control && control.invalid;
    });
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  @ViewChild('formRef') formRef!: NgForm;

  savePhilhealth(formRef: NgForm): void {

    if (formRef.invalid) {
      // Mark all controls as touched to show validation errors
      Object.values(this.formRef.controls).forEach(control => {
        control.markAsTouched();
      });

      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });

      return; // Stop here if form is invalid
    }

    // Convert comma-separated string into array of strings
    this.philhealthItem.signAndSymptoms = this.symptomsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.generalSurvey = this.generalSurveyInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.heent = this.heentInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.lungs = this.lungsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.cvs = this.cvsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.abdomen = this.abdomenInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.gu = this.guInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.extremities = this.extremitiesInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthItem.neuroExam = this.neuroExamInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.philhealthService.createPhilhealth(this.philhealthItem).subscribe(() => {
      alert('Philhealth added successfully!'); // Optional Snackbar
      this.router.navigate(['/common/philhealth']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/philhealth']); // ✅ Go back on cancel
  }
  onPatientSelect(patientId: number): void {
    // If you have a patient service, you could load the patient details
    this.patientService.getPatientById(patientId).subscribe(patient => {
      // Populate the form fields with patient data
      this.philhealthItem.memFirstName = patient.firstName;
      this.philhealthItem.memMiddleName = patient.middleName;
      this.philhealthItem.memLastName = patient.lastName;
      this.philhealthItem.memDateOfBirth = patient.dateOfBirth;
      this.philhealthItem.patFirstName = patient.firstName;
      this.philhealthItem.patMiddleName = patient.middleName;
      this.philhealthItem.patLastName = patient.lastName;
      this.philhealthItem.patDateOfBirth = patient.dateOfBirth;
      this.philhealthItem.patSex = patient.gender;

      // ... other field assignments
    });
  }
  ngOnInit(): void {
    // Load patients when component initializes
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        // Handle error appropriately
      }
    });
  }


  protected readonly philhealthDto = Philhealth;
}
