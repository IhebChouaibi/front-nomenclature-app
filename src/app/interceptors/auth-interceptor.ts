import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
   if (req.url.includes('/login')) {
    return next(req); 
  }
  


    
  console.log('Interceptor triggered');
  console.log('Token:', token);
  console.log('Request URL:', req.url);

  if (authService.isAuthenticated() && token) {
    console.log('Adding Authorization header');
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }
  
  console.warn('No token available, sending request without auth');
  return next(req);
  
};