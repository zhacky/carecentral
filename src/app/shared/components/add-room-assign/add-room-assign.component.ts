import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RoomAssignDto, RoomAssignStatus} from '../../../core/models/room-assign.model';
import {RoomAssignService} from '../../../core/services/room-assign.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-room-assign',
  templateUrl: './add-room-assign.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class AddRoomAssignComponent {
  roomAssignItem: RoomAssignDto = {
    position: 0,
    roomAssignId: 0,
    roomAssignDescription: '',
    daysOfStay: 0,
    assignedDate: '',
    dischargeDate: '',
    status: RoomAssignStatus.ACTIVE,
  };

  constructor(
    private roomAssignService: RoomAssignService,
    private router: Router
  ) {}

  saveRoomAssign(): void {
    this.roomAssignService.createRoomAssign(this.roomAssignItem).subscribe(() => {
      alert('Room Assignment added successfully!'); // Optional Snackbar
      this.router.navigate(['/common/roomAssign']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/roomAssign']); // ✅ Go back on cancel
  }

  protected readonly RoomAssignDto = RoomAssignDto;
}
