import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-room-details',
  imports: [NgIf],
  templateUrl: './room-details.component.html',
  standalone: true,
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent {
  roomInfo = {
    roomId: 'R101',
    roomType: 'Private',
    roomDescription:
      'A quiet, air-conditioned private room with TV and ensuite bathroom.',
    roomCapacity: 1,
    roomCharge: '₱3,500 / day',
  };
}
