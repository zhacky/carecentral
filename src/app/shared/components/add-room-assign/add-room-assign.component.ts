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
    this.roomService.getRooms().subscribe(
      (rooms) => {
        // Store fetched rooms in the `rooms` array
        this.rooms = rooms; // Now available for the dropdown
      },
      (error) => {
        console.error('Error fetching rooms:', error);
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
