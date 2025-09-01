import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const authService = inject( AuthService);
    const router = inject( Router);

    if(authService.isAuthenticated()&&  (authService.isAdmin() || authService.isResponsable() )){
      return true
    }
  

  return  router.createUrlTree(['/login'],{
    queryParams:{returnUrl:state.url}
  });
};
