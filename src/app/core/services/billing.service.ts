import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Billing } from '../models/billing.model'; // Assuming the path to your Billing model

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor() { }

  getBillings(): Observable<Billing[]> {
    // Replace this with your actual data fetching logic (e.g., HTTP request)
    const dummyBillings: Billing[] = [
      { id: 1, patientName: 'John Doe', amount: 150.50, date: new Date(), services: [] },
      { id: 2, patientName: 'Jane Smith', amount: 300.00, date: new Date(), services: [] },
      { id: 3, patientName: 'Peter Jones', amount: 75.20, date: new Date(), services: [] },
    ];
    return of(dummyBillings);
  }
}