import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const userRoles = this.authService.getCurrentUser()?.roles;
    console.log('Required Roles:', requiredRoles);
    console.log('User Roles:', userRoles);
    if (this.authService.hasAnyRole(requiredRoles)) {
      return true;
    }
    // Redirect to unauthorized page or login
    this.router.navigate(['/common/unauthorized']);
    return false;
  }
}