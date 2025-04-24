import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PhilhealthDto} from '../models/philhealth.model';

@Injectable({
  providedIn: 'root'
})
export class PhilhealthService {

  private apiUrl = `${environment.apiUrl}/philhealths`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all philhealths
  getPhilhealths(): Observable<PhilhealthDto[]> {
    return this.http.get<PhilhealthDto[]>(this.apiUrl);
  }

  // Create a new philhealth
  createPhilhealth(philhealth: PhilhealthDto): Observable<PhilhealthDto> {
    return this.http.post<PhilhealthDto>(this.apiUrl, philhealth);
  }

  // Get a philhealth by ID
  getPhilhealthById(id: number): Observable<PhilhealthDto> {
    return this.http.get<PhilhealthDto>(`${this.apiUrl}/${id}`);
  }

  // Delete a philhealth
  deletePhilhealth(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a philhealth
  updatePhilhealth(id: number, philhealth: {
    philhealthId: number;
    patFirstName?: string;
    patMiddleName?: string;
    patLastName?: string;
    memFirstName?: string;
    memMiddleName?: string;
    memLastName?: string;
    patPIN?: string;
    memPIN?: string;
    relationToMember?: string;
    patDateOfBirth?: string; // ISO string
    memDateOfBirth?: string;
    patAge?: number;
    patSex?: string;
    patHeight?: number;
    patWeight?: number;
    chiefComplaint?: string;
    admittingDiagnosis?: string;
    dischargeDiagnosis?: string;
    firstCaseRateCode?: string;
    secondCaseRateCode?: string;
    dateAdmitted?: string;
    timeAdmitted?: string;
    dateDischarged?: string;
    timeDischarged?: string;
    patPresentHistoryOfIllness?: string;
    patPertinentPastMedicalHistory?: string;
    treatmentOutcome?: string;
    bloodPressure?: string;
    capillaryRefill?: string;
    heartRate?: number;
    respiratoryRate?: number;
    temperature?: number;
    courseInTheWards?: string;
    diagnosticFindings?: string;
    signAndSymptoms?: string;
    generalSurvey?: string;
    heent?: string;
    lungs?: string;
    cvs?: string;
    abdomen?: string;
    gu?: string;
    extremities?: string;
    neuroExam?: string;
  }): Observable<PhilhealthDto> {
    return this.http.put<PhilhealthDto>(`${this.apiUrl}/${id}`, philhealth);
  }
}
