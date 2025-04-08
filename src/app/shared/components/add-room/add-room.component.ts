import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RoomDto, RoomStatus} from '../../../core/models/room.model';
import {RoomService} from '../../../core/services/room.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class AddRoomComponent {
  roomItem: RoomDto = {
    position: 0,
    roomId: 0,
    roomType: '',
    roomDescription: '',
    roomCapacity: 0,
    roomCharge: '',
    status: RoomStatus.ACTIVE,
  };

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  saveRoom(): void {
    this.roomService.createRoom(this.roomItem).subscribe(() => {
      alert('Room added successfully!'); // Optional Snackbar
      this.router.navigate(['/common/room']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/room']); // ✅ Go back on cancel
  }

  protected readonly RoomDto = RoomDto;
}
