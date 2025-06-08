export interface BillingItem {
  itemId: number;
  billingId: number;
  billingItemDate: string;
  itemName: string;
  itemDescription: string;
  billedBy: string;
  amount: number;
}

export interface Billing {
  billingId: number;
  patientId: number;
  billingDate: string;
  totalAmount: number;
  items: BillingItem[];
} 