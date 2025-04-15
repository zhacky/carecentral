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
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {RoomAssignService} from '../../core/services/room-assign.service';
import {RoomAssignDto, RoomAssignStatus} from '../../core/models/room-assign.model';

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
    NgClass
  ],
  templateUrl: './room-assign.component.html',
  standalone: true,
  styleUrl: './room-assign.component.css'
})
export class RoomAssignComponent implements AfterViewInit, OnInit {
  constructor(private roomAssignService: RoomAssignService) {}

  displayedColumns: string[] = ['roomAssignId', 'daysOfStay', 'assignedDate', 'dischargeDate', 'status', 'actions'];

  // DataSource for the table (initially empty)
  dataSource = new MatTableDataSource<RoomAssignDto>([]);

  searchTerm: string = '';

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: RoomAssignDto, filter: string) => {
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

  // Load the patients using the service
  loadRoomAssigns(): void {
    this.roomAssignService.getRoomAssigns().subscribe(
      (roomAssigns) => {
        // Add position dynamically
        this.dataSource.data = roomAssigns.map((room, index) => ({
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
