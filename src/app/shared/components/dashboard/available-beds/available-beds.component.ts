import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../../../core/services/room.service';
import {RoomAssignService} from '../../../../core/services/room-assign.service';
import {Room} from '../../../../core/models/room.model';

@Component({
  selector: 'app-available-beds',
  imports: [],
  templateUrl: './available-beds.component.html',
  styleUrl: './available-beds.component.css'
})
export class AvailableBedsComponent implements OnInit {
  availableBeds: number = 0;

  constructor(
    private roomService: RoomService,
    private roomAssignService: RoomAssignService
  ) {
  }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms: Room[]) => {
      this.roomAssignService.getRoomAssigns().subscribe((assignments: any[]) => {
        let totalAvailable = 0;
        rooms.forEach(room => {
          const assignedCount = assignments.filter(a => a.room === room.roomId && a.status === 'ACTIVE').length;
          totalAvailable += (room.roomCapacity - assignedCount);
        });
        this.availableBeds = totalAvailable;
      });
    });
    }

}
