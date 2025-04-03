export class DoctorDto {
  position: number;
  doctorId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  status: DoctorStatus;

  constructor(
    position: number,
    doctorId: number,
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    contactNumber: string,
    email: string,
    address: string,
    status: DoctorStatus,
  ) {
    this.position = position;
    this.doctorId = doctorId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.contactNumber = contactNumber;
    this.email = email;
    this.address = address;
    this.status = status;
  }

  static fromDoctor(doctor: any, position: number): DoctorDto {
    return new DoctorDto(
      position,
      doctor.doctorId,
      doctor.firstName,
      doctor.middleName,
      doctor.lastName,
      doctor.dateOfBirth,
      doctor.gender,
      doctor.contactNumber,
      doctor.email,
      doctor.address,
      doctor.status as DoctorStatus
    )
  }
}

export enum DoctorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
