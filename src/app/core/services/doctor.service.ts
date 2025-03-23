import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorDto } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = `${environment.apiUrl}/doctors`;  // Make sure the base URL is correct

  constructor(private http: HttpClient) {}

  // Fetch all doctors
  getDoctors(): Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>(this.apiUrl);
  }

  // Create a new doctor
  createDoctor(doctor: DoctorDto): Observable<DoctorDto> {
    return this.http.post<DoctorDto>(this.apiUrl, doctor);
  }

  // Get a doctor by ID
  getDoctorById(id: number): Observable<DoctorDto> {
    return this.http.get<DoctorDto>(`${this.apiUrl}/${id}`);
  }

  // Delete a doctor
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a doctor
  updateDoctor(id: number, doctor: DoctorDto): Observable<DoctorDto> {
    return this.http.put<DoctorDto>(`${this.apiUrl}/${id}`, doctor);
  }

}
