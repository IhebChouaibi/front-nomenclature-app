import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const authReverseGuard: CanActivateFn = (route :ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
   return router.createUrlTree(['/home'], {
      queryParams: { returnUrl: state.url } });
  }

  return true;
};
