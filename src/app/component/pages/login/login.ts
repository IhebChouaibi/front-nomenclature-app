import { Component } from '@angular/core';
import { AuthRequest } from '../../../models/auth-request';
import { AuthService } from '../../../service/auth-service';
import { Router } from '@angular/router';
import { TextField } from '../../text-field/text-field';

@Component({
  selector: 'app-login',

  standalone :false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  authRequest : AuthRequest = {username:'',password :''}
  errorMessage :string ='';
  


  constructor(private auth : AuthService, private router :Router){}


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
        this.errorMessage = 'Accès réservé aux administrateurs';
      window.alert('Vous n\'avez pas les permissions nécessaires pour vous connecter.');
window.location.reload();
      }
    },
    error: err => {
            console.error('Erreur de connexion:', err);

      if (err.status===401){
        

        window.alert('Nom d\'utilisateur ou mot de passe incorrect !');
window.location.reload();      }
    }
  });
  }






}
