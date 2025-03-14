// patient.dto.model.ts

export class PatientDto {
  position: number; // This represents the row number (or position in the table)
  patientId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  assignedDoctorId: number; // This could represent the Doctor ID associated with the patient

  constructor(
    position: number,
    patientId: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    contactNumber: string,
    email: string,
    address: string,
    assignedDoctorId: number
  ) {
    this.position = position;
    this.patientId = patientId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.contactNumber = contactNumber;
    this.email = email;
    this.address = address;
    this.assignedDoctorId = assignedDoctorId;
  }

  // Utility method to create a PatientDto from a plain object
  static fromPatient(patient: any, position: number): PatientDto {
    return new PatientDto(
      position,
      patient.patientId,
      patient.firstName,
      patient.lastName,
      patient.dateOfBirth,
      patient.gender,
      patient.contactNumber,
      patient.email,
      patient.address,
      patient.assignedDoctorId
    );
  }
}
