import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomAssignDto } from '../models/room-assign.model';

@Injectable({
  providedIn: 'root'
})
export class RoomAssignService {

  private apiUrl = `${environment.apiUrl}/roomAssigns`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all rooms
  getRoomAssigns(): Observable<RoomAssignDto[]> {
    return this.http.get<RoomAssignDto[]>(this.apiUrl);
  }

  // Create a new room assign
  createRoomAssign(roomAssign: RoomAssignDto): Observable<RoomAssignDto> {
    return this.http.post<RoomAssignDto>(this.apiUrl, roomAssign);
  }

  // Get a room assign by ID
  getRoomAssignById(id: number): Observable<RoomAssignDto> {
    return this.http.get<RoomAssignDto>(`${this.apiUrl}/${id}`);
  }

  // Delete a room assign
  deleteRoomAssign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a room assign
  updateRoomAssign(id: number, roomAssign: RoomAssignDto): Observable<RoomAssignDto> {
    return this.http.put<RoomAssignDto>(`${this.apiUrl}/${id}`, roomAssign);
  }

}
