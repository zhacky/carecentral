import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormSubmissionGuard } from '../login/form.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [MatCardModule, CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  step = 1;
  isLoading = false;
  formTouchedStep1 = false;
  formTouchedStep2 = false;

  constructor(
    private authService: AuthService, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private formSubmissionGuard: FormSubmissionGuard,
  ) {}

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  goToNextStep() {
    this.formTouchedStep1 = true; 
    this.isLoading = true;
  
    if (this.formData.firstName && this.formData.lastName && this.formData.email) {
      setTimeout(() => {
        this.step = 2;
        this.isLoading = false;
      }, 1000); // Simulate loading
    } else {
      this.isLoading = false; // if validation fails
    }
  }

  goBack() {
    this.step = 1; 
  }

  submitForm() {
    this.formTouchedStep2 = true; 
    
    if (this.formData.username && this.formData.password && this.formData.confirmPassword) {
 
      if (this.formData.password !== this.formData.confirmPassword) {
        this.snackBar.open('Passwords do not match', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        return;
      }

      this.isLoading = true;
      setTimeout(() => {
      this.authService.register(this.formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.formSubmissionGuard.setFormSubmitted(true);
          this.router.navigate(['/success-message']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.snackBar.open('Username or Email already exist.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
          this.isLoading = false;
        }
      });
    }, 3000);
    }
  }
}
