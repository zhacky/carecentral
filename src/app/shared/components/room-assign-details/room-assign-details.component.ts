import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomAssignService} from '../../../core/services/room-assign.service';
import {PatientService} from '../../../core/services/patient.service';
import {forkJoin, of, switchMap} from 'rxjs';
import {RoomService} from '../../../core/services/room.service';

@Component({
  selector: 'app-room-assign-details',
  imports: [],
  templateUrl: './room-assign-details.component.html',
  standalone: true,
  styleUrl: './room-assign-details.component.css',
})
export class RoomAssignDetailsComponent {

  roomAssignInfo: { roomAssignId: number; roomAssignDescription: string; assignedDate: string; dischargeDate: string} = {
    roomAssignId: 0,
    roomAssignDescription: '',
    assignedDate: '',
    dischargeDate: ''
  };

  patientFullName: string = '';
  roomType: string = '';

  constructor(
    private route: ActivatedRoute,
    private roomAssignService: RoomAssignService,
    private roomService: RoomService,
    private patientService: PatientService
  ) {}

  goBack() {
    window.history.back(); // Or use router.navigate(['/your-route']);
  }

  // ngOnInit(): void {
  //   const roomAssignId = Number(this.route.snapshot.paramMap.get('id'));
  //
  //   this.roomAssignService.getRoomAssignById(roomAssignId).pipe(
  //     // when the room-assign record arrives…
  //     switchMap(roomAssign => {
  //       this.roomAssignInfo = roomAssign;                // show the assignment info
  //       const patientId = roomAssign.patient;          // <- adjust to the real field name
  //
  //       // if we have a patient ID, fetch that patient; otherwise emit null
  //       return patientId ? this.patientService.getPatientById(patientId) : of(null);
  //     })
  //   ).subscribe({
  //     next: patient => {
  //       if (patient) {
  //         // Build “First M. Last” (middle initial optional)
  //         const middleInitial = patient.middleName ? `${patient.middleName.charAt(0)}.` : '';
  //         this.patientFullName = `${patient.firstName} ${middleInitial} ${patient.lastName}`
  //           .replace(/\s+/g, ' ')
  //           .trim();
  //       } else {
  //         this.patientFullName = 'Unknown';
  //       }
  //     },
  //     error: err => console.error('Error loading room assignment or patient:', err)
  //   });
  // }

  ngOnInit(): void {
    const roomAssignId = Number(this.route.snapshot.paramMap.get('id'));

    this.roomAssignService.getRoomAssignById(roomAssignId).pipe(
      switchMap(roomAssign => {
        this.roomAssignInfo = roomAssign;
        const patientId = roomAssign.patient;
        const roomId = roomAssign.room;

        // Run both patient and room lookups in parallel
        return forkJoin({
          patient: patientId ? this.patientService.getPatientById(patientId) : of(null),
          room: roomId ? this.roomService.getRoomById(roomId) : of(null)
        });
      })
    ).subscribe({
      next: ({ patient, room }) => {
        // ✅ Handle patient name
        if (patient) {
          const middleInitial = patient.middleName ? `${patient.middleName.charAt(0)}.` : '';
          this.patientFullName = `${patient.firstName} ${middleInitial} ${patient.lastName}`
            .replace(/\s+/g, ' ')
            .trim();
        } else {
          this.patientFullName = 'Unknown';
        }

        // ✅ Handle room name
        this.roomType = room?.roomType || 'Unknown Room';
      },
      error: err => console.error('Error loading room assignment, patient, or room:', err)
    });
  }

  calculateDayOfStay(dischargeDate: string): number {
    if (!dischargeDate) return 0;

    const currentDate = new Date();
    const endDate = new Date(dischargeDate);

    const timeDiff = endDate.getTime() - currentDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return dayDiff > 0 ? dayDiff : 0;
  }


}
