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
    RouterModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    const trimmedEmail = this.loginForm.value.email;
    const trimmedPassword = this.loginForm.value.password;
    console.log(`Attempting login with email2: ${trimmedEmail} and password: ${trimmedPassword}`);
    if (this.authService.login(trimmedEmail, trimmedPassword)) {
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
      duration: 20000,
      panelClass: ['snackbar-error']
    });
     }
    }
}


