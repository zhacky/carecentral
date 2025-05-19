import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PhilhealthService} from '../../../core/services/philhealth.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-edit-philhealth',
  templateUrl: './edit-philhealth.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    MatInput
  ],
  standalone: true
})
export class EditPhilhealthComponent implements OnInit {
  philhealthItem : {
    bloodPressure: string;
    signAndSymptoms: string[];
    dateAdmitted: string;
    memPIN: string;
    patPertinentPastMedicalHistory: string;
    memFirstName: string;
    abdomen: string[];
    chiefComplaint: string;
    extremities: string[];
    patMiddleName: string;
    firstCaseRateCode: string;
    patHeight: number;
    temperature: number;
    courseInTheWards: string;
    patPIN: string;
    lungs: string[];
    memDateOfBirth: string;
    timeAdmitted: string;
    memLastName: string;
    cvs: string[];
    dischargeDiagnosis: string;
    generalSurvey: string[];
    respiratoryRate: number;
    heent: string[];
    secondCaseRateCode: string;
    neuroExam: string[];
    patSex: string;
    timeDischarged: string;
    gu: string[];
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
    treatmentOutcome: string;
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

  constructor(
    private route: ActivatedRoute,
    private philhealthService: PhilhealthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if (id) {
      this.philhealthService.getPhilhealthById(id).subscribe((item) => {
        this.philhealthItem = item;
        this.symptomsInput = item.signAndSymptoms.join(', ');
        this.generalSurveyInput = item.generalSurvey.join(', ');
        this.heentInput = item.heent.join(', ');
        this.lungsInput = item.lungs.join(', ');
        this.cvsInput = item.cvs.join(', ');
        this.abdomenInput = item.abdomen.join(', ');
        this.guInput = item.gu.join(', ');
        this.extremitiesInput = item.extremities.join(', ');
        this.neuroExamInput = item.neuroExam.join(', ');
      });
    }
  }

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

  updatePhilhealth(formRef: NgForm): void {

    if (this.formRef.invalid) {
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

    this.philhealthService.updatePhilhealth(this.philhealthItem.philhealthId, this.philhealthItem).subscribe(() => {
      alert('Philhealth updated successfully!'); // Optional Snackbar
      this.router.navigate(['/common/philhealth']); // ✅ Redirect after update
    });
  }

  cancel(): void {
    this.router.navigate(['/common/philhealth']); // ✅ Go back on cancel
  }
}
