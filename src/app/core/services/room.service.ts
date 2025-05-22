import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room, RoomStatus} from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = `${environment.apiUrl}/rooms`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all rooms
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  // Create a new room
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  // Get a room by ID
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
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
  }): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
  }

}
