import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RoomDto, RoomStatus} from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = `${environment.apiUrl}/rooms`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all rooms
  getRooms(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(this.apiUrl);
  }

  // Create a new room
  createRoom(room: RoomDto): Observable<RoomDto> {
    return this.http.post<RoomDto>(this.apiUrl, room);
  }

  // Get a room by ID
  getRoomById(id: number): Observable<RoomDto> {
    return this.http.get<RoomDto>(`${this.apiUrl}/${id}`);
  }

  // Delete a room
  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a room
  updateRoom(id: number, room: {
    roomId: number;
    roomType: string;
    roomDescription: string;
    roomCapacity: number;
    roomCharge: string;
    status: RoomStatus
  }): Observable<RoomDto> {
    return this.http.put<RoomDto>(`${this.apiUrl}/${id}`, room);
  }

}
