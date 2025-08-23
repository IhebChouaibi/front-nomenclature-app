import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthRequest } from '../../../models/auth-request';
import { AuthService } from '../../../service/auth-service';
import { Router } from '@angular/router';
import { TextField } from '../../text-field/text-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',

  standalone :false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  authRequest : AuthRequest = {username:'',password :''}
  errorMessage :string ='';
  


  constructor(private auth : AuthService,
     private router :Router,
    private snack : MatSnackBar,
  private cdr: ChangeDetectorRef){}


 onLogin(): void {
    if (!this.authRequest.username || !this.authRequest.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.errorMessage = '';

    console.log('Tentative de connexion avec:', this.authRequest);

    this.auth.login(this.authRequest).subscribe({
     next: response => {
      if (response.role === 'ADMIN') {
        this.auth.saveAuthData(response);
        this.router.navigate(['/home']);
      } else {
        console.error('Accès refusé : rôle non autorisé');
        this.errorMessage = 'Accès interdit !!';
        
        this.snack.open(this.errorMessage,'Fermer',{
        duration: 3000,
        panelClass: ['error-snackbar']
      });
        this.authRequest = { username: '', password: '' };

        this.cdr.detectChanges();

     
   
      }
    },
    error: err => {
            console.error('Erreur de connexion:', err);
        this.authRequest = { username: '', password: '' };
        this.cdr.detectChanges();

    }
  });
  }






}
