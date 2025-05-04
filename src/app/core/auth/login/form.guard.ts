import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionGuard implements CanActivate {
  private formSubmitted = false;

  constructor(private router: Router) {}

  // Method to set the form submission status
  setFormSubmitted(status: boolean) {
    this.formSubmitted = status;
  }

  canActivate(): boolean {
    if (this.formSubmitted) {
      return true; // Allow access if the form was successfully submitted
    } else {
      // Redirect to the sign-up page if the form was not submitted
      this.router.navigate(['/login']);
      return false;
    }
  }
}