import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private readonly apiUrl = `${environment.apiUrl}/api/auth/login`;
   private currentUser: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username: username.trim(), password: password.trim() };
    console.log('Current API URL:', environment.apiUrl);
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      tap((response) => {
        this.currentUser = response.userDetails; // Assuming the response contains user information
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }),
      catchError((error) => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.apiUrl}/register`, userData, { headers }).pipe(
      catchError((error) => {
        console.error('Registration error', error);
        throw error;
      })
    );
  }

    getCurrentUser(): any {
      if (!this.currentUser) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      }
      return this.currentUser;
    }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users`).pipe(
      catchError((error) => {
        console.error('Error fetching users', error);
        throw error;
      })
    );
  }
}
