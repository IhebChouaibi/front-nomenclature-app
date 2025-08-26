import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TARIC } from '../models/taric';
import { Reglementation } from '../models/reglementation';

@Injectable({
  providedIn: 'root'
})
export class ReglementationService {

    private baseUrl = environment.apiUrl; 

  constructor(private http:HttpClient){}
  
  getInfo(code: string ):Observable<TARIC>{
    return this.http.get<TARIC>(`${this.baseUrl}/info`, { withCredentials: true })

  }
  getRegles (code : String):Observable<Reglementation[]>{
    return this.http.get<Reglementation[]>(`${this.baseUrl}/regles`, { withCredentials: true })
  }
}
