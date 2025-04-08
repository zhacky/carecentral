import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard: isLoggedIn:', isLoggedIn, 'state.url:', state.url);

    // Allow unauthenticated users to access the login page
    if (!isLoggedIn && state.url === '/login') {
      console.log('AuthGuard: Allowing access to /login for unauthenticated users');
      return true;
    }

    // Prevent logged-in users from accessing the login page
    if (isLoggedIn && state.url === '/login') {
      console.log('AuthGuard: Redirecting authenticated user to /common/dashboard');
      this.router.navigate(['/common/dashboard']);
      return false;
    }

    // Redirect unauthenticated users to the login page for protected routes
    if (!isLoggedIn) {
      console.log('AuthGuard: Redirecting unauthenticated user to /login');
      this.router.navigate(['/login']);
      return false;
    }

    // Allow access to the route
    return true;
  }
}