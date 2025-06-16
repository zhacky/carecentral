import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PharmacySale, Receipt } from '../models/pharmacy.model';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  private apiUrl = `${environment.apiUrl}/pharmacy`;

  constructor(private http: HttpClient) { }

  // Create a new sale
  createSale(sale: PharmacySale): Observable<PharmacySale> {
    return this.http.post<PharmacySale>(`${this.apiUrl}/sales`, sale);
  }

  // Get all sales
  getSales(): Observable<PharmacySale[]> {
    return this.http.get<PharmacySale[]>(`${this.apiUrl}/sales`);
  }

  // Get a sale by ID
  getSaleById(saleId: number): Observable<PharmacySale> {
    return this.http.get<PharmacySale>(`${this.apiUrl}/sales/${saleId}`);
  }

  // Generate a receipt for a sale
  generateReceipt(saleId: number): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.apiUrl}/sales/${saleId}/receipt`, {});
  }

  // Get a receipt by ID
  getReceiptById(receiptId: number): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.apiUrl}/receipts/${receiptId}`);
  }

  // Update inventory after a sale
  updateInventoryAfterSale(items: { inventoryId: number, quantity: number }[]): Observable<InventoryItem[]> {
    return this.http.post<InventoryItem[]>(`${this.apiUrl}/inventory/update-after-sale`, items);
  }

  // Process payment
  processPayment(saleId: number, paymentMethod: string, amount: number): Observable<PharmacySale> {
    return this.http.post<PharmacySale>(`${this.apiUrl}/sales/${saleId}/payment`, {
      paymentMethod,
      amount
    });
  }
}
