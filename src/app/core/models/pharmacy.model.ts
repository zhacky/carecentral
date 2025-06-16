export interface CartItem {
  inventoryId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface PharmacySale {
  saleId?: number;
  saleDate: string;
  items: CartItem[];
  totalAmount: number;
  patientId?: number; // Optional, for linking to a patient
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface Receipt {
  receiptId?: number;
  saleId: number;
  receiptDate: string;
  items: CartItem[];
  subtotal: number;
  tax?: number;
  discount?: number;
  totalAmount: number;
  paymentMethod: string;
  cashierName?: string;
}
