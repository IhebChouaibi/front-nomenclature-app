import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let message = 'Une erreur est survenue';
      if (err.status === 0) {
        message = 'Vérifiez votre connexion Internet.';
      } else if (err.status === 404) {
        message = 'Ressource introuvable';
      } else if (err.status === 403) {
        message = 'Accès refusé';
      } else if (err.status) {
        message = 'Erreur interne du serveur';
      }

      snack.open(message, 'Fermer', { duration: 3000 });

      return throwError(() => err);
    })
  );
};
