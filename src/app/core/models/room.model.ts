export class Room {
  position: number;
  roomId: number;
  roomType: string;
  roomDescription: string;
  roomCapacity: number;
  roomCharge: string;
  status: RoomStatus;
  availableCapacity?: number;

  constructor(
    position: number,
    roomId: number,
    roomType: string,
    roomDescription: string,
    roomCapacity: number,
    roomCharge: string,
    status: RoomStatus,
    availableCapacity?: number
  ) {
    this.position = position;
    this.roomId = roomId;
    this.roomType = roomType;
    this.roomDescription = roomDescription;
    this.roomCapacity = roomCapacity;
    this.roomCharge = roomCharge;
    this.status = status;
    this.availableCapacity = availableCapacity ?? roomCapacity;
  }

  static fromRoom(room: any, position: number, assignedCount = 0) : Room {
    const availableCapacity = room.roomCapacity - assignedCount;
    return new Room (
      position,
      room.roomId,
      room.roomType,
      room.roomDescription,
      room.roomCapacity,
      room.roomCharge,
      room.status as RoomStatus,
      availableCapacity
    )
  }
}

export enum RoomStatus {
  OCCUPIED = 'OCCUPIED',
  AVAILABLE = 'AVAILABLE'
}
