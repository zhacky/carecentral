import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoomAssign} from '../models/room-assign.model';

@Injectable({
  providedIn: 'root'
})
export class RoomAssignService {

  private apiUrl = `${environment.apiUrl}/roomAssigns`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all rooms
  getRoomAssigns(): Observable<RoomAssign[]> {
    return this.http.get<RoomAssign[]>(this.apiUrl);
  }

  // Create a new room assign
  createRoomAssign(roomAssign: RoomAssign): Observable<RoomAssign> {
    return this.http.post<RoomAssign>(this.apiUrl, roomAssign);
  }

  // Get a room assign by ID
  getRoomAssignById(id: number): Observable<RoomAssign> {
    return this.http.get<RoomAssign>(`${this.apiUrl}/${id}`);
  }

  // Delete a room assign
  deleteRoomAssign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a room assign
    updateRoomAssign(id: number, roomAssign: {
        roomAssignId: number;
        roomAssignDescription: string;
        dischargeDate: string;
        patient: number;
        room: number
    }): Observable<RoomAssign> {
    return this.http.put<RoomAssign>(`${this.apiUrl}/${id}`, roomAssign);
  }

}
