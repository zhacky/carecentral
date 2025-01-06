import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

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
    MatSnackBarModule
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    const trimmedEmail = this.loginForm.value.username.trim();
    const trimmedPassword = this.loginForm.value.password.trim();
    console.log(`Attempting login with email: ${trimmedEmail} and password: ${trimmedPassword}`);
    
    this.authService.login(trimmedEmail, trimmedPassword).subscribe(
      success => {
        if (success) {
          console.log('Navigating to /common');
          this.router.navigate(['/common']).then(success => {
            if (success) {
              console.log('Navigation successful!');
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
        } else {
          this.errorMessage = 'Invalid email or password.';
          console.error('Login failed!');
          this.snackBar.open('Invalid email or password.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error => {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Login error:', error);
        this.snackBar.open('An error occurred. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}

