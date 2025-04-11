import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private readonly apiUrl = `${environment.apiUrl}/api/auth/login`;
   private currentUser: any;
   private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
   private loggedIn$ = this.loggedIn.asObservable();
  router: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username: username.trim(), password: password.trim() };
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      tap((response) => {
        this.currentUser = { token: response.token, ...response.userDetails }; // Include token and user details
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); // Store in localStorage
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

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return !!user.token;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.loggedIn.next(false);
  }
  
}