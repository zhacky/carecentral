import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-philhealth-details',
  imports: [NgForOf],
  templateUrl: './philhealth-details.component.html',
  standalone: true,
  styleUrl: './philhealth-details.component.css',
})
export class PhilhealthDetailsComponent implements OnInit {
  member = {
    firstName: 'John',
    middleName: 'Alexander',
    lastName: 'Doe',
    pin: '123456789',
    birthDate: 'January 1, 1970',
  };

  patient = {
    firstName: 'Jane',
    middleName: 'Marie',
    lastName: 'Doe',
    pin: '987654321',
    birthDate: 'June 5, 1995',
    relation: 'Daughter',
    gender: 'Female',
    height: '165 cm',
    weight: '58 kg',
  };

  admission = {
    caseRate1: 'CR123',
    caseRate2: 'CR456',
    admittedDate: 'April 15, 2025',
    admittedTime: '09:00 AM',
    dischargedDate: 'April 20, 2025',
    dischargedTime: '04:30 PM',
    chiefComplaint: 'Severe abdominal pain',
    admittingDiagnosis: 'Appendicitis',
    dischargeDiagnosis: 'Post-appendectomy recovery',
  };

  recordVitals = {
    history: 'Patient presented with increasing abdominal pain over 3 days.',
    pastHistory: 'No significant medical history.',
    courseInWard: 'Underwent appendectomy. IV antibiotics administered.',
    labs: 'WBC elevated. Ultrasound confirmed appendicitis.',
    bloodPressure: '120/80 mmHg',
    capillaryRefill: '2 seconds',
    heartRate: '80 bpm',
    respiratoryRate: '18 breaths/min',
    temperature: '37.5°C',
  };

  // Patient details object
  patientDetails = {
    treatmentOutcomeReason: 'Chronic condition monitoring',
  };

  // Treatment Outcome data (checkbox values and their states)
  treatmentOutcome = [
    { name: 'Improved', selected: true },
    { name: 'Recovered', selected: false },
    { name: 'HAMA/DAMA', selected: true },
    { name: 'Expired', selected: false },
    { name: 'ABSCONDED', selected: false },
    { name: 'Transferred', selected: true },
  ];

  signsAndSymptoms = [
    { name: 'Abdominal cramp/pain', selected: true },
    { name: 'Altered mental sensorium', selected: false },
    { name: 'Anorexia', selected: false },
    { name: 'Bleeding gums', selected: false },
    { name: 'Blurring of vision', selected: false },
    { name: 'Body weakness', selected: true },
    { name: 'Chest pain/discomfort', selected: false },
    { name: 'Constipation', selected: false },
    { name: 'Cough', selected: true },
    { name: 'Diarrhea', selected: false },
    { name: 'Dizziness', selected: false },
    { name: 'Dysphagia', selected: false },
    { name: 'Dyspnea', selected: true },
    { name: 'Dysuria', selected: false },
    { name: 'Epistaxis', selected: false },
    { name: 'Fever', selected: true },
    { name: 'Frequency of urination', selected: true },
    { name: 'Headache', selected: true },
    { name: 'Hematemesis', selected: false },
    { name: 'Hematuria', selected: false },
    { name: 'Hemoptysis', selected: false },
    { name: 'Irritability', selected: true },
    { name: 'Jaundice', selected: false },
    { name: 'Lower extremity edema', selected: false },
    { name: 'Myalgia', selected: true },
    { name: 'Orthopnea', selected: false },
    { name: 'Pain, __________ (site)', selected: false },
    { name: 'Palpitations', selected: false },
    { name: 'Seizures', selected: false },
    { name: 'Skin rashes', selected: true },
    { name: 'Stool, bloody/black tarry/mucoid', selected: false },
    { name: 'Sweating', selected: false },
    { name: 'Urgency', selected: false },
    { name: 'Vomiting', selected: false },
    { name: 'Weight loss', selected: true },
  ];

  generalSurvey = [
    { name: 'Awake and Alert', selected: true },
    { name: 'Altered Sensorium: __________', selected: false },
  ];

  // Other symptoms (specify input value)
  otherSymptoms = {
    selected: false,
    specify: '',
  };

  // Template section data
  sections = [
    {
      title: 'HEENT',
      options: [
        { name: 'Essentially normal', selected: true },
        { name: 'Abnormal pupillary reaction', selected: false },
        { name: 'Cervical lymphadenopathy', selected: false },
        { name: 'Dry mucous membrane', selected: false },
        { name: 'Icteric sclerae', selected: false },
        { name: 'Pale conjunctivae', selected: true },
        { name: 'Sunken eyeballs', selected: false },
        { name: 'Sunken fontanelle', selected: true },
      ],
    },
    {
      title: 'Lungs',
      options: [
        { name: 'Essentially normal', selected: true },
        { name: 'Asymmetrical chest expansion', selected: true },
        { name: 'Decreased breath sounds', selected: true },
        { name: 'Wheezes', selected: true },
        { name: 'Lump/s over breast(s)', selected: false },
        { name: 'Rales/crackles/rhonchi', selected: false },
        { name: 'Intercostal rib/clavicular retraction', selected: false },
      ],
    },
    {
      title: 'CVS',
      options: [
        { name: 'Essentially normal', selected: true },
        { name: 'Displaced apex beat', selected: true },
        { name: 'Heaves and/or thrills', selected: true },
        { name: 'Pericardial bulge', selected: true },
        { name: 'Irregular rhythm', selected: false },
        { name: 'Muffled heart sounds', selected: false },
        { name: 'Murmur', selected: false },
      ],
    },
    {
      title: 'Abdomen',
      options: [
        { name: 'Essentially normal', selected: true },
        { name: 'Abdominal rigidity', selected: true },
        { name: 'Abdomen tenderness', selected: true },
        { name: 'Hyperactive bowel sounds', selected: true },
        { name: 'Palpable mass(es)', selected: false },
        { name: 'Tympanitic/dull abdomen', selected: false },
        { name: 'Uterine contraction', selected: false },
      ],
    },
    {
      title: 'GU',
      options: [
        { name: 'Essentially normal', selected: true },
        { name: 'Blood stained in exam finger', selected: false },
        { name: 'Cervical dilatation', selected: true },
        { name: 'Presence of abdominal discharge', selected: false },
      ],
    },
    {
      title: 'Extremities',
      options: [
        { name: 'Essentially normal', selected: true },
        { name: 'Clubbing', selected: false },
        { name: 'Cold clammy skin', selected: true },
        { name: 'Cyanosis/mottled skin', selected: false },
        { name: 'Edema/swelling', selected: false },
        { name: 'Decreased mobility', selected: true },
        { name: 'Pale nailbeds', selected: false },
        { name: 'Poor skin turgor', selected: true },
        { name: 'Rashes/petechiae', selected: true },
        { name: 'Weak pulses', selected: false },
      ],
    },
    {
      title: 'Neuro Exam',
      options: [
        { name: 'Essentially normal', selected: true },
        { name: 'Abnormal gait', selected: false },
        { name: 'Abnormal position sense', selected: false },
        { name: 'Abnormal/decreased sensation', selected: true },
        { name: 'Abnormal reflex(es)', selected: false },
        { name: 'Poor/altered memory', selected: true },
        { name: 'Poor muscle tone/strength', selected: false },
        { name: 'Poor coordination', selected: true },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize patient details and other data here, if necessary
  }
}
