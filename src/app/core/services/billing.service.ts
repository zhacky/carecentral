import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Billing } from '../models/billing.model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) { }

  getBillingsForPatient(patientId: number): Observable<Billing[]> {
    return this.http.get<Billing[]>(`${this.apiUrl}/${patientId}/billings`);
  }
} 