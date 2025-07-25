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
import {RoomService} from '../../core/services/room.service';
import {Room, RoomStatus} from '../../core/models/room.model';
import { AuthService } from '../../core/services/auth.service';
import {RoomAssignService} from '../../core/services/room-assign.service';
import {RoomAssign} from '../../core/models/room-assign.model';
import {PageTemplateComponent} from '../../shared/components/page-template/page-template.component';

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
    FormsModule,
    NgClass,
    RouterLink,
    CommonModule,
    PageTemplateComponent
  ],
  templateUrl: './room.component.html',
  standalone: true,
  styleUrl: './room.component.css'
})
export class RoomComponent implements AfterViewInit, OnInit {
  constructor(private roomService: RoomService, private roomAssignService: RoomAssignService, private router: Router, private authService: AuthService) {}

  rooms: Room[] = [];
  assignments: RoomAssign[] = [];
  dataSource = new MatTableDataSource<Room>();

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  displayedColumns: string[] = ['roomId', 'roomType', 'roomCapacity', 'roomCharge', 'status', 'actions'];

  // DataSource for the table (initially empty)
  // dataSource = new MatTableDataSource<RoomDto>([]);

  searchTerm = '';

  editRoom(roomId: number) {
    this.router.navigate(['/common/room/edit', roomId]);
  }

  viewRoom(roomId: number) {
    this.router.navigate(['/common/room/details', roomId]);
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Room, filter: string) => {
      return (
        data.roomType.toLowerCase().includes(filter) ||
        data.roomCapacity.toString().includes(filter) ||
        data.roomCharge.toLowerCase().includes(filter) ||
        data.roomId.toString().includes(filter)
      );
    };
  }

  // Fetch patients when the component initializes
  ngOnInit(): void {
    this.loadRooms();
  }

  // loadRooms() {
  //   // Assuming you fetch both rooms and assignments from backend
  //   this.roomService.getRooms().subscribe((roomsData: any[]) => {
  //     this.roomAssignService.getRoomAssigns().subscribe((assignmentsData: any[]) => {
  //       this.assignments = assignmentsData.map((a, index) => RoomAssign.fromRoomAssign(a, index + 1));
  //
  //       this.rooms = roomsData.map((room, index) => {
  //         const roomDto = Room.fromRoom(room, index + 1);
  //         const assignedCount = this.assignments.filter(a => a.room === roomDto.roomId && a.status === 'ACTIVE').length;
  //         roomDto.availableCapacity = roomDto.roomCapacity - assignedCount;
  //         return roomDto;
  //       });
  //
  //       this.dataSource.data = this.rooms;
  //     });
  //   });
  // }

  loadRooms() {
    this.roomService.getRooms().subscribe((roomsData: any[]) => {
      this.roomAssignService.getRoomAssigns().subscribe((assignmentsData: any[]) => {
        this.assignments = assignmentsData.map((a, index) => RoomAssign.fromRoomAssign(a, index + 1));

        this.rooms = roomsData.map((room, index) => {
          const roomDto = Room.fromRoom(room, index + 1);
          const assignedCount = this.assignments.filter(a => a.room === roomDto.roomId && a.status === 'ACTIVE').length;
          roomDto.availableCapacity = roomDto.roomCapacity - assignedCount;

          const desiredStatus = roomDto.availableCapacity === 0 ? RoomStatus.OCCUPIED : RoomStatus.AVAILABLE;

          if (roomDto.status !== desiredStatus) {
            const updatedRoomPayload = {
              roomId: roomDto.roomId,
              roomType: roomDto.roomType,
              roomDescription: roomDto.roomDescription,
              roomCapacity: roomDto.roomCapacity,
              roomCharge: roomDto.roomCharge,
              status: desiredStatus
            };

            this.roomService.updateRoom(roomDto.roomId, updatedRoomPayload).subscribe({
              next: () => console.log(`Room ${roomDto.roomId} status updated to ${desiredStatus}`),
              error: err => console.error(`Failed to update room ${roomDto.roomId}:`, err)
            });

            roomDto.status = desiredStatus; // Update local object immediately
          }

          return roomDto;
        });

        this.dataSource.data = this.rooms;
      });
    });
  }

  // Function to delete a doctor
  deleteRoom(roomId: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.roomService.deleteRoom(roomId).subscribe(
        () => {
          // Remove the patient from the data source after successful deletion
          this.dataSource.data = this.dataSource.data.filter(room => room.roomId !== roomId);
        },
        (error) => {
          console.error('Error deleting room:', error);
        }
      );
    }
  }

  protected readonly RoomStatus = RoomStatus;
}
