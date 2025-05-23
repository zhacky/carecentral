import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    NgIf,
    MatError,
    MatLabel,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    },
    {
      validator: this.passwordMatchValidator
    }
  );
  console.log(this.registerForm)
  }

  passwordMatchValidator(formGroup: FormGroup) {

    const password = formGroup.get('password')?.value;

    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };

  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log('Registration successful!', response);
          this.router.navigate(['/login']);
          this.snackBar.open('Successfully Registered!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: (error: any) => {
          console.error('Registration failed!', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
    }
  }
}
