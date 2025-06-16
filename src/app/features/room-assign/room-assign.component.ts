import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router, RouterLink} from '@angular/router';
import {CommonModule, NgClass} from '@angular/common';
import {RoomAssignService} from '../../core/services/room-assign.service';
import {RoomAssign, RoomAssignStatus} from '../../core/models/room-assign.model';
import { AuthService } from '../../core/services/auth.service';
import { forkJoin } from 'rxjs';
import {PatientService} from '../../core/services/patient.service';
import {RoomService} from '../../core/services/room.service';

@Component({
  selector: 'app-room',
  imports: [
    MatTable,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    RouterLink,
    FormsModule,
    NgClass,
    CommonModule
  ],
  templateUrl: './room-assign.component.html',
  standalone: true,
  styleUrl: './room-assign.component.css'
})
export class RoomAssignComponent implements AfterViewInit, OnInit {
  constructor(
    private roomAssignService: RoomAssignService,
    private patientService: PatientService,
    private roomService: RoomService,
    private authService: AuthService,
    private router: Router
  ) {}

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  displayedColumns: string[] = ['roomAssignId', 'daysOfStay', 'roomType', 'dischargeDate', 'status', 'actions'];

  // DataSource for the table (initially empty)
  dataSource = new MatTableDataSource<RoomAssign>([]);

  searchTerm = '';

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  viewRoomAssign(roomAssignId: number) {
    this.router.navigate(['/common/roomAssign/details', roomAssignId]);
  }

  editRoomAssign(roomAssignId: number) {
    this.router.navigate(['/common/roomAssign/edit', roomAssignId]);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: RoomAssign, filter: string) => {
      return (
        data.daysOfStay.toString().includes(filter) ||
        data.assignedDate.toLowerCase().includes(filter) ||
        data.dischargeDate.toLowerCase().includes(filter) ||
        data.roomAssignId.toString().includes(filter)
      );
    };
  }

  // Fetch Room Assign when the component initializes
  ngOnInit(): void {
    this.loadRoomAssigns();
  }

  loadRoomAssigns(highlightedId?: number): void {
    forkJoin({
      roomAssigns: this.roomAssignService.getRoomAssigns(),
      patients: this.patientService.getPatients(),
      rooms: this.roomService.getRooms()
    }).subscribe(
      ({ roomAssigns, patients, rooms }) => {
        // Create a map of patient IDs to full names
        const patientMap = new Map<number, string>();
        patients.forEach(p => {
          const middleInitial = p.middleName ? `${p.middleName.charAt(0)}.` : '';
          const fullName = `${p.firstName} ${middleInitial} ${p.lastName}`.replace(/\s+/g, ' ').trim();
          patientMap.set(p.patientId, fullName);
        });

        const roomMap = new Map<number, string>();
        rooms.forEach(r => {
          const room = r.roomType;
          roomMap.set(r.roomId, room);
        });

        // Sort by status: ACTIVE first, INACTIVE last
        roomAssigns.sort((a, b) => {
          if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
          if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
          return 0;
        });

        // Map data to dataSource with patient names and index position
        this.dataSource.data = roomAssigns.map((roomAssign, index) => ({
          ...roomAssign,
          position: index + 1,
          patientName: patientMap.get(roomAssign.patient) ?? 'Unknown',
          roomType: roomMap.get(roomAssign.room) ?? 'Unknown'
        }));

        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching room assignments or patients:', error);
      }
    );
  }

  // Function to delete a room Assign
  deleteRoomAssign(roomAssignId: number): void {
    if (confirm('Are you sure you want to delete this Room Assignee?')) {
      this.roomAssignService.deleteRoomAssign(roomAssignId).subscribe(
        () => {
          // Remove the patient from the data source after successful deletion
          this.dataSource.data = this.dataSource.data.filter(roomAssign => roomAssign.roomAssignId !== roomAssignId);
        },
        (error) => {
          console.error('Error deleting room:', error);
        }
      );
    }
  }

  protected readonly RoomAssignStatus = RoomAssignStatus;
}
