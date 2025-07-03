import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratory } from '../models/laboratory.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  private apiUrl = `${environment.apiUrl}/laboratory`;

  constructor(private http: HttpClient) {}

  getLaboratoryRecords(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(this.apiUrl);
  }

  getLaboratoryRecord(id: number): Observable<Laboratory> {
    return this.http.get<Laboratory>(`${this.apiUrl}/${id}`);
  }

  createLaboratoryRecord(record: Laboratory): Observable<Laboratory> {
    return this.http.post<Laboratory>(this.apiUrl, record);
  }

  updateLaboratoryRecord(id: number, record: Laboratory): Observable<Laboratory> {
    return this.http.put<Laboratory>(`${this.apiUrl}/${id}`, record);
  }

  deleteLaboratoryRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
