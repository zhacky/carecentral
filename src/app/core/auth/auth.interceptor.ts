import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // check if the rquest url ends with /api/auth/login or /api/auth/register
  if (req.url.endsWith('/api/auth/login') || req.url.endsWith('/api/auth/register')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.getToken();
  console.log("Token: ", token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
