// patient.dto.model.ts

export class PatientDto {
  position: number;
  patientId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  placeOfBirth: string;
  occupation: string;
  nationality: string;
  civilStatus: string;
  religion: string;
  spouseName: string;
  fatherName: string;
  fatherAddress: string;
  motherName: string;
  motherAddress: string;
  toNotifyName: string;
  toNotifyAddress: string;
  assignedDoctorId: number;

  constructor(
    position: number,
    patientId: number,
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    contactNumber: string,
    email: string,
    address: string,
    placeOfBirth: string,
    occupation: string,
    nationality: string,
    civilStatus: string,
    religion: string,
    spouseName: string,
    fatherName: string,
    fatherAddress: string,
    motherName: string,
    motherAddress: string,
    toNotifyName: string,
    toNotifyAddress: string,
    assignedDoctorId: number
  ) {
    this.position = position;
    this.patientId = patientId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.contactNumber = contactNumber;
    this.email = email;
    this.address = address;
    this.placeOfBirth = placeOfBirth;
    this.occupation = occupation;
    this.nationality = nationality;
    this.civilStatus = civilStatus;
    this.religion = religion;
    this.spouseName = spouseName;
    this.fatherName = fatherName;
    this.fatherAddress = fatherAddress;
    this.motherName = motherName;
    this.motherAddress = motherAddress;
    this.toNotifyName = toNotifyName;
    this.toNotifyAddress = toNotifyAddress;
    this.assignedDoctorId = assignedDoctorId;
  }

  static fromPatient(patient: any, position: number): PatientDto {
    return new PatientDto(
      position,
      patient.patientId,
      patient.firstName,
      patient.middleName,
      patient.lastName,
      patient.dateOfBirth,
      patient.gender,
      patient.contactNumber,
      patient.email,
      patient.address,
      patient.placeOfBirth,
      patient.occupation,
      patient.nationality,
      patient.civilStatus,
      patient.religion,
      patient.spouseName,
      patient.fatherName,
      patient.fatherAddress,
      patient.motherName,
      patient.motherAddress,
      patient.toNotifyName,
      patient.toNotifyAddress,
      patient.assignedDoctorId
    );
  }
}
