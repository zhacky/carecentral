import {Component, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoomAssignDto, RoomAssignStatus} from '../../../core/models/room-assign.model';
import {RoomAssignService} from '../../../core/services/room-assign.service';
import {FormsModule, NgForm} from '@angular/forms';
import {PatientService} from '../../../core/services/patient.service';
import {RoomService} from '../../../core/services/room.service';
import {PatientDto} from '../../../core/models/patient.model';
import {RoomDto} from '../../../core/models/room.model';
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
  roomAssignItem: RoomAssignDto = {
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

  patients: PatientDto[] = [];
  rooms: RoomDto[] = [];

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

  // loadPatients(): void {
  //   this.patientService.getPatients().subscribe(
  //     (patients) => {
  //       // Store fetched patients in the `patients` array
  //       this.patients = patients; // Now available for the dropdown
  //     },
  //     (error) => {
  //       console.error('Error fetching patients:', error);
  //     }
  //   );
  // }
  loadPatients(): void {
    forkJoin({
      patients: this.patientService.getPatients(),
      assignments: this.roomAssignService.getRoomAssigns(),
      rooms: this.roomService.getRooms()
    }).subscribe(
      ({ patients, assignments, rooms }) => {
        const roomMap = new Map<number, string>();
        rooms.forEach(room => roomMap.set(room.roomId, room.status));

        // Filter out patients who are:
        // - NOT in any assignment
        // - OR assigned to a room that is INACTIVE
        const assignedPatientIds = assignments
          .filter(a => a.status === 'ACTIVE') // only consider active assignments
          .map(a => ({
            patientId: a.patient,
            roomStatus: roomMap.get(a.room)
          }));

        const assignedSet = new Set(
          assignedPatientIds
            .filter(ar => ar.roomStatus === 'ACTIVE') // keep those with ACTIVE room
            .map(ar => ar.patientId)
        );

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
          .filter(r => r.status === 'ACTIVE')
          .map((room, idx) => {
            const assigned = activeAssignments.filter(a => a.room === room.roomId).length;
            return RoomDto.fromRoom(room, idx + 1, assigned);   // capacity already set
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
      alert('Room Assignment added successfully!'); // Optional Snackbar
      this.router.navigate(['/common/roomAssign']); // ✅ Redirect after save
    });
  }

  cancel(): void {
    this.router.navigate(['/common/roomAssign']); // ✅ Go back on cancel
  }

  protected readonly RoomAssignDto = RoomAssignDto;
}
