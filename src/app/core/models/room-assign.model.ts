export class RoomAssignDto {
  position: number;
  roomAssignId: number;
  roomAssignDescription: string;
  daysOfStay: number;
  assignedDate: string;
  dischargeDate: string;
  status: RoomAssignStatus;
  patient: number;
  room: number

  constructor(
    position: number,
    roomAssignId: number,
    roomAssignDescription: string,
    daysOfStay: number,
    assignedDate: string,
    dischargeDate: string,
    status: RoomAssignStatus,
    patient: number,
    room: number
  ) {
    this.position = position;
    this.roomAssignId = roomAssignId;
    this.roomAssignDescription = roomAssignDescription;
    this.daysOfStay = daysOfStay;
    this.assignedDate = assignedDate;
    this.dischargeDate = dischargeDate;
    this.status = status;
    this.patient = patient;
    this.room = room;
  }

  static fromRoomAssign(roomAssign: any, position: number) : RoomAssignDto {
    return new RoomAssignDto(
      position,
      roomAssign.roomAssignId,
      roomAssign.roomAssignDescription,
      roomAssign.daysOfStay,
      roomAssign.assignedDate,
      roomAssign.dischargeDate,
      roomAssign.status as RoomAssignStatus,
      roomAssign.patient,
      roomAssign.room
    )
  }
}

export enum RoomAssignStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
