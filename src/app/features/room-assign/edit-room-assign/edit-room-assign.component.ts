import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomAssignService} from '../../../core/services/room-assign.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {forkJoin} from 'rxjs';
import {Room} from '../../../core/models/room.model';
import {Patient} from '../../../core/models/patient.model';
import {RoomService} from '../../../core/services/room.service';
import {PatientService} from '../../../core/services/patient.service';

@Component({
  selector: 'app-edit-room-assign',
  templateUrl: './edit-room-assign.component.html',
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class EditRoomAssignComponent implements OnInit {
  roomAssignDto: {
    roomAssignId: number;
    roomAssignDescription: string;
    dischargeDate: string;
    patient: number;
    room: number;
  } = {
    roomAssignId: 0,
    roomAssignDescription: '',
    dischargeDate: '',
    patient: 0,
    room: 0,
  };

  patients: Patient[] = [];
  rooms: Room[] = [];

  constructor(
    private route: ActivatedRoute,
    private roomAssignService: RoomAssignService,
    private roomService: RoomService,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.roomAssignService.getRoomAssignById(id).subscribe((item) => {
        this.roomAssignDto = item;
        this.loadRooms(); // ✅ Passively uses roomAssignDto.room inside loadRooms
      });
    } else {
      this.loadRooms(); // for cases like creation, fallback
    }

    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (patients) => {
        // Store fetched patients in the `patients` array
        this.patients = patients; // Now available for the dropdown
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  loadRooms(): void {
    forkJoin({
      rooms: this.roomService.getRooms(),
      assignments: this.roomAssignService.getRoomAssigns()
    }).subscribe(
      ({ rooms, assignments }) => {
        const activeAssignments = assignments.filter(a => a.status === 'ACTIVE');

        this.rooms = rooms
          .filter(room => room.status === 'AVAILABLE')
          .map((room, idx) => {
            const assignedCount = activeAssignments.filter(a => a.room === room.roomId).length;
            return Room.fromRoom(room, idx + 1, assignedCount);
          })
          .filter(room => {
            const hasCapacity = (room.availableCapacity ?? 0) > 0;
            const isCurrentRoom = room.roomId === this.roomAssignDto.room;
            return hasCapacity || isCurrentRoom;
          })
          .sort((a, b) => (a.roomId! > b.roomId! ? 1 : -1));
      },
      error => console.error('Error fetching rooms or assignments:', error)
    );
  }

  updateRoomAssign(formRef: NgForm): void {

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

    this.roomAssignService.updateRoomAssign(this.roomAssignDto.roomAssignId, this.roomAssignDto).subscribe(() => {
      this.snackBar.open('Room assignment updated successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/common/roomAssign']); // ✅ Redirect after update
    });
  }

  cancel(): void {
    this.router.navigate(['/common/roomAssign']); // ✅ Go back on cancel
  }
}
