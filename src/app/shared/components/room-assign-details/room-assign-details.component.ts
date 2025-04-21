import { Component } from '@angular/core';

@Component({
  selector: 'app-room-assign-details',
  imports: [],
  templateUrl: './room-assign-details.component.html',
  standalone: true,
  styleUrl: './room-assign-details.component.css',
})
export class RoomAssignDetailsComponent {
  assignmentInfo = {
    roomAssignId: 'RA123',
    roomAssignDescription: 'Assigned to Room 305 for post-operative recovery.',
    dayOfStay: 5,
    assignedDate: '2025-04-15',
    dischargeDate: '2025-04-20',
    status: 'Discharged',
  };
}
