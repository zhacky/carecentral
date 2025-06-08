import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Philhealth} from '../models/philhealth.model';

@Injectable({
  providedIn: 'root'
})
export class PhilhealthService {

  private apiUrl = `${environment.apiUrl}/philhealths`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all philhealths
  getPhilhealths(): Observable<Philhealth[]> {
    return this.http.get<Philhealth[]>(this.apiUrl);
  }

  // Create a new philhealth
  createPhilhealth(philhealth: {
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
  }): Observable<Philhealth> {
    return this.http.post<Philhealth>(this.apiUrl, philhealth);
  }

  // Get a philhealth by ID
  getPhilhealthById(id: number): Observable<Philhealth> {
    return this.http.get<Philhealth>(`${this.apiUrl}/${id}`);
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
    signAndSymptoms?: string[];
    generalSurvey?: string[];
    heent?: string[];
    lungs?: string[];
    cvs?: string[];
    abdomen?: string[];
    gu?: string[];
    extremities?: string[];
    neuroExam?: string[];
  }): Observable<Philhealth> {
    return this.http.put<Philhealth>(`${this.apiUrl}/${id}`, philhealth);
  }

  // Download Philhealth CF3 PDF
  printPhilhealthCF3Pdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/philhealthCF3Pdf/${id}`, { responseType: 'blob' });
  }

  // Download Philhealth CF4 PDF
  printPhilhealthCF4Pdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/philhealthCF4Pdf/${id}`, { responseType: 'blob' });
  }
}
