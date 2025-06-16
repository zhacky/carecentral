import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Room, RoomStatus} from '../../../core/models/room.model';
import {RoomService} from '../../../core/services/room.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  standalone: true
})
export class AddRoomComponent {
  roomItem: Room = {
    position: 0,
    roomId: 0,
    roomType: '',
    roomDescription: '',
    roomCapacity: 0,
    roomCharge: '',
    status: RoomStatus.AVAILABLE,
  };

  constructor(
    private roomService: RoomService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  saveRoom(formRef: NgForm): void {

    if (this.formRef.invalid) {
      // Mark all controls as touched to show validation errors
      Object.values(this.formRef.controls).forEach(control => {
        control.markAsTouched();
      });

      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });

      return; // Stop here if form is invalid
    }

    this.roomService.createRoom(this.roomItem).subscribe(() => {
      this.snackBar.open('Room added successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/common/room']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/room']); // ✅ Go back on cancel
  }

  protected readonly RoomDto = Room;
}
