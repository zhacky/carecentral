export interface Laboratory {
  labId: number;
  testName: string;
  patientName: string;
  date: Date;
  status: 'Pending' | 'Completed' | 'Cancelled';
  // Add other relevant fields as needed
  
}
