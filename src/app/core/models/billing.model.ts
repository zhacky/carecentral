export interface Billing {
  id: number;
  patientName: string;
  amount: number;
  date: Date;
  services: {
    name: string;
    price: number;
    quantity: number;
  }[];
}