export class RoomDto {
  position: number;
  roomId: number;
  roomType: string;
  roomDescription: string;
  roomCapacity: number;
  roomCharge: string;
  status: RoomStatus;

  constructor(
    position: number,
    roomId: number,
    roomType: string,
    roomDescription: string,
    roomCapacity: number,
    roomCharge: string,
    status: RoomStatus
  ) {
    this.position = position;
    this.roomId = roomId;
    this.roomType = roomType;
    this.roomDescription = roomDescription;
    this.roomCapacity = roomCapacity;
    this.roomCharge = roomCharge;
    this.status = status;
  }

  static fromRoom(room: any, position: number) : RoomDto {
    return new RoomDto (
      position,
      room.roomId,
      room.roomType,
      room.roomDescription,
      room.roomCapacity,
      room.roomCharge,
      room.status as RoomStatus
    )
  }
}

export enum RoomStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
