import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PatientRecord} from '../models/patient-record.model';

@Injectable({
  providedIn: 'root'
})
export class PatientRecordService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getPatientRecordsForPatient(patientId: number): Observable<PatientRecord[]> {
    return this.http.get<PatientRecord[]>(`${this.apiUrl}/patients/${patientId}/patient-records`);
  }

  getPatientRecordById(patientRecordId: number): Observable<PatientRecord> {
    return this.http.get<PatientRecord>(`${this.apiUrl}/patientRecords/${patientRecordId}`);
  }
}
