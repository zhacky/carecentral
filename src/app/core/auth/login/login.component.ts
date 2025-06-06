import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    setTimeout(() => {
    this.authService.login(username, password).subscribe({
      next: () => {
        const currentUser = this.authService.getCurrentUser() as { roles: string[]; username: string; status: string };
        // Check roles and redirect
         if (currentUser.status && currentUser.status.toLowerCase() !== 'active') {
          this.snackBar.open('Your account is not active. Please contact admin.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
          
          this.isLoading = false;
          // Optionally, log out the user if token is set
          this.authService.logout();
          return;
        }

        if (currentUser.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/common/dashboard']).then(success => {
            if (success) {
              this.snackBar.open(`Welcome ${currentUser.username}!`, 'Close', {
                duration: 3000,
                panelClass: ['snackbar-success']
              });
            }
          });
        } else {
          this.router.navigate(['/common/profile']).then(success => {
            if (success) {
              this.snackBar.open(`Welcome ${currentUser.username}!`, 'Close', {
                duration: 3000,
                panelClass: ['snackbar-success']
              });
            }
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password.';
        console.error('Login failed!', error);
        this.snackBar.open('Invalid username or password.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }, 2000)
}
}
