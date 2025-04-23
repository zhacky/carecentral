import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../../core/services/room.service';
import {RoomDto} from '../../../core/models/room.model';

@Component({
  selector: 'app-room-details',
  imports: [NgForOf, NgIf],
  templateUrl: './room-details.component.html',
  standalone: true,
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent {
  roomInfo: { roomDescription: string; roomCharge: string; roomCapacity: number; roomId: number; roomType: string } = {
    roomId: 0,
    roomType: '',
    roomDescription:
      '',
    roomCapacity: 0,
    roomCharge: '',
  };

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  goBack() {
    window.history.back(); // Or use router.navigate(['/your-route']);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.roomService.getRoomById(id).subscribe({
      next: (data) => {
        this.roomInfo = data;
      },
      error: (err) => {
        console.error('Error fetching doctor:', err);
      }
    });
  }
}
