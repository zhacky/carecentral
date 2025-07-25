import {Component, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoomAssign, RoomAssignStatus} from '../../../core/models/room-assign.model';
import {RoomAssignService} from '../../../core/services/room-assign.service';
import {FormsModule, NgForm} from '@angular/forms';
import {PatientService} from '../../../core/services/patient.service';
import {RoomService} from '../../../core/services/room.service';
import {Patient} from '../../../core/models/patient.model';
import {Room, RoomStatus} from '../../../core/models/room.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-room-assign',
  templateUrl: './add-room-assign.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  standalone: true
})
export class AddRoomAssignComponent implements OnInit {
  roomAssignItem: RoomAssign = {
    position: 0,
    roomAssignId: 0,
    roomAssignDescription: '',
    daysOfStay: 0,
    assignedDate: '',
    dischargeDate: '',
    status: RoomAssignStatus.ACTIVE,
    patient: 0,
    room: 0
  };

  patients: Patient[] = [];
  rooms: Room[] = [];

  constructor(
    private roomAssignService: RoomAssignService,
    private patientService: PatientService,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild('formRef') formRef!: NgForm;

  ngOnInit(): void {
    this.loadPatients();
    this.loadRooms();
  }

  loadPatients(): void {
    forkJoin({
      patients: this.patientService.getPatients(),
      assignments: this.roomAssignService.getRoomAssigns(),
      rooms: this.roomService.getRooms()
    }).subscribe(
      ({ patients, assignments, rooms }) => {
        const assignedSet = new Set<number>();

        // Add all patients that are actively assigned to any room
        assignments.forEach(assign => {
          if (assign.status === RoomAssignStatus.ACTIVE) {
            assignedSet.add(assign.patient);
          }
        });

        // Only include patients who are NOT actively assigned
        this.patients = patients.filter(p => !assignedSet.has(p.patientId));
      },
      error => {
        console.error('Error loading patients, assignments, or rooms:', error);
      }
    );
  }

  loadRooms(): void {
    forkJoin({
      rooms: this.roomService.getRooms(),
      assignments: this.roomAssignService.getRoomAssigns()
    }).subscribe(
      ({ rooms, assignments }) => {
        // Filter only ACTIVE assignments
        const activeAssignments = assignments.filter(a => a.status === 'ACTIVE');

        // Process and filter rooms
        this.rooms = rooms
          .filter(r => r.status === 'AVAILABLE')
          .map((room, idx) => {
            const assigned = activeAssignments.filter(a => a.room === room.roomId).length;
            return Room.fromRoom(room, idx + 1, assigned);   // capacity already set
          })
          .filter(r => r.availableCapacity! > 0);

        // `this.rooms` now contains only available & active rooms
      },
      (error) => {
        console.error('Error fetching rooms or assignments:', error);
      }
    );
  }

  saveRoomAssign(formRef: NgForm): void {

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

    if (!this.roomAssignItem.patient) {
      this.snackBar.open('Please assign a patient to the assigned room.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });
      return; // Prevent saving if no patient is assigned
    }

    if (!this.roomAssignItem.room) {
      this.snackBar.open('Please assign a room to the assigned room.', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });
      return; // Prevent saving if no room is assigned
    }

    this.roomAssignService.createRoomAssign(this.roomAssignItem).subscribe(() => {
      this.snackBar.open('Room Assignment added successfully!', 'Close', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/common/roomAssign']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/roomAssign']); // ✅ Go back on cancel
  }

  protected readonly RoomAssignDto = RoomAssign;
}
