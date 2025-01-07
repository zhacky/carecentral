import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/common']).then(success => {
          if (success) {
            this.snackBar.open('Login successful!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          } else {
            console.error('Navigation failed!');
            this.snackBar.open('Navigation failed!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          }
        });
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password.';
        console.error('Login failed!', error);
        this.snackBar.open('Invalid username or password.', 'Close', {
          duration: 20000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}