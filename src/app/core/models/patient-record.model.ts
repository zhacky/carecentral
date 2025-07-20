// patient-record.dto.model.ts
export class PatientRecord {
  patientRecordId: number;
  patientId: number;
  visitDate: string;
  diagnosis: string;
  prescription: string;
  note:  string;
  doctorId: number;

  constructor(
    patientRecordId: number,
    patientId: number,
    visitDate: string,
    diagnosis: string,
    prescription: string,
    note: string,
    doctorId: number
    ) {
    this.patientRecordId = patientRecordId;
    this.patientId = patientId;
    this.visitDate = visitDate;
    this.diagnosis = diagnosis;
    this.prescription = prescription;
    this.note = note;
    this.doctorId = doctorId;
  }
}
