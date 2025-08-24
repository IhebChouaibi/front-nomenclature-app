import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statut } from '../models/statut';

@Injectable({
  providedIn: 'root'
})
export class Vallidation {
   private baseUrl = environment.apiUrl + '/validation'; 
  
 constructor(private http: HttpClient) {}
 
getStatut(idStatut: number): Observable<Statut> {
  return this.http.get<Statut>(`${this.baseUrl}/statut?idStatut=${idStatut}`);
}

  
}
