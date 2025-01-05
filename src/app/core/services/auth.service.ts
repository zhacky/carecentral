import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly email: string = 'admin@gmail.com';
  private readonly password: string = 'adminpass';

  login(email: string, password: string): boolean {
    console.log(`Attempting login with email: ${this.email} and password: ${this.password}`);
    return email.trim() === this.email && password.trim() === this.password;
  }
}
