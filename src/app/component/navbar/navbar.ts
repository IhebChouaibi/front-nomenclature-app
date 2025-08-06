import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isMobileMenuOpen = false ; 


  constructor(private auth:AuthService,private router:  Router){

  }

  toggleMobileMenu(){
    this.isMobileMenuOpen =!this.isMobileMenuOpen
  }
logout(){
  this.auth.logout();
  this.router.navigate(['/login']);
}


}
