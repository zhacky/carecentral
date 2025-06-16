import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RoomStatus} from '../../../core/models/room.model';
import {RoomService} from '../../../core/services/room.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  standalone: true
})
export class EditRoomComponent implements OnInit {
  roomDto: {
    roomId: number;
    roomType: string;
    roomDescription: string;
    roomCapacity: number;
    roomCharge: string;
    status: RoomStatus;
  } = {
    roomId: 0,
    roomType: '',
    roomDescription: '',
    roomCapacity: 0,
    roomCharge: '',
    status: RoomStatus.AVAILABLE,
  };

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if (id) {
      this.roomService.getRoomById(id).subscribe((item) => {
        this.roomDto = item;
      });
    }
  }

  updateRoom(formRef: NgForm): void {

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

    this.roomService.updateRoom(this.roomDto.roomId, this.roomDto).subscribe(() => {
      this.snackBar.open('Room updated successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/common/room']); // ✅ Redirect after update
    });
  }

  cancel(): void {
    this.router.navigate(['/common/room']); // ✅ Go back on cancel
  }
}
