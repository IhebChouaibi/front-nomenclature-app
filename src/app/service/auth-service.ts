
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment/enviroment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private baseUrl :string ='http://localhost:8082' ;

  private tokenSub = new BehaviorSubject<string | null>(null);
  private roleSub = new BehaviorSubject<string | null>(null);
  private usernameSub = new BehaviorSubject<string | null>(null);
  
  public token$ = this.tokenSub.asObservable();
  public role$ = this.roleSub.asObservable();
  public username$ = this.usernameSub.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    
    this.tokenSub.next(token);
    this.roleSub.next(role);
    this.usernameSub.next(username);
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, authRequest);
  }

  saveAuthData(response: AuthResponse): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userRole', response.role);
    localStorage.setItem('username', response.username);
    
    this.tokenSub.next(response.token);
    this.roleSub.next(response.role);
    this.usernameSub.next(response.username);
    
    console.log('Role:', response.role);
    console.log('Token:', response.token);
    console.log('Username:', response.username);
    console.log('Token Subject:', this.tokenSub.value);
    console.log('Role Subject:', this.roleSub.value);
    console.log('Email Subject:', this.usernameSub.value);
  }

  getToken(): string | null {
    return this.tokenSub.value; 
  }

  getRole(): string | null {
    return this.roleSub.value; 
  }

  getEmail(): string | null {
    return this.usernameSub.value;
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    this.tokenSub.next(null);
    this.roleSub.next(null);
    this.usernameSub.next(null);
    
    this.router.navigate(['/login']);
  }
}
