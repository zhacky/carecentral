import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormSubmissionGuard } from '../login/form.guard';

@Component({
  selector: 'app-sign-up',
  imports: [MatCardModule, CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  step = 1;
  
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
    
    if (this.formData.firstName && this.formData.lastName && this.formData.email) {
      this.step = 2; 
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

      
      this.authService.register(this.formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.formSubmissionGuard.setFormSubmitted(true);
          this.router.navigate(['/success-message']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
}
