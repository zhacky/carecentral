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
import {RoomDto, RoomStatus} from '../../core/models/room.model';
import { AuthService } from '../../core/services/auth.service';

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
    CommonModule
  ],
  templateUrl: './room.component.html',
  standalone: true,
  styleUrl: './room.component.css'
})
export class RoomComponent implements AfterViewInit, OnInit {
  constructor(private roomService: RoomService, private router: Router, private authService: AuthService) {}

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  displayedColumns: string[] = ['roomId', 'roomType', 'roomCapacity', 'roomCharge', 'status', 'actions'];

  // DataSource for the table (initially empty)
  dataSource = new MatTableDataSource<RoomDto>([]);

  searchTerm: string = '';

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
    this.dataSource.filterPredicate = (data: RoomDto, filter: string) => {
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

  // Load the patients using the service
  loadRooms(): void {
    this.roomService.getRooms().subscribe(
      (rooms) => {
        // Add position dynamically
        this.dataSource.data = rooms.map((room, index) => ({
          ...room,
          position: index + 1,  // Position starts at 1 and increments
        }));
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
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
