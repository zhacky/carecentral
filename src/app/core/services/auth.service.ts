import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/authenticate`, { username, password })
      .pipe(
        map(response => {
          if (response.token) {
            // Save the token or handle the response as needed
            localStorage.setItem('authToken', response.token);
            return true;
          } else {
            return false;
          }
        })
      );
  }
}