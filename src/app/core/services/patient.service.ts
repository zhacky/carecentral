import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PatientDto } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = `${environment.apiUrl}/patients`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all patients
  getPatients(): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(this.apiUrl);
  }

  // Create a new patient
  createPatient(patient: PatientDto): Observable<PatientDto> {
    return this.http.post<PatientDto>(this.apiUrl, patient);
  }

  // Get a patient by ID
  getPatientById(id: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.apiUrl}/${id}`);
  }

  // Delete a patient
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a patient
  updatePatient(id: number, patient: PatientDto): Observable<PatientDto> {
    return this.http.put<PatientDto>(`${this.apiUrl}/${id}`, patient);
  }

  // Download Patient Data Sheet PDF
  printPatientDataSheetPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/patientPdf/${id}`, { responseType: 'blob' });
  }

  // Download Emergency Room PDF
  printEmergencyRoomPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/emergencyRoomPatientPdf/${id}`, { responseType: 'blob' });
  }

  // Download Authorization Surgical Treatment PDF
  printAuthorizationSurgicalTreatmentPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/authorizationSurgicalTreatmentPdf/${id}`, { responseType: 'blob' });
  }

}
