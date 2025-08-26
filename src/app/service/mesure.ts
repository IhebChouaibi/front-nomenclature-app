import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Mesure } from '../models/mesure';
import { Observable } from 'rxjs';
import { MouvementCommercial } from '../models/mouvement-commercial';
import { Reglementation } from '../models/reglementation';

@Injectable({
  providedIn: 'root'
})
export class MesureService{
    private baseUrl = environment.apiUrl+'/mesure'; 
    
   constructor(private http: HttpClient) {}

  public getAllMvt():Observable<MouvementCommercial[]>{
    return this.http.get<MouvementCommercial[]>(`${this.baseUrl}/getAllMvt`,{withCredentials:true})
  }
  public getAllReglement():Observable<Reglementation[]>{
    return this.http.get<Reglementation[]>(`${this.baseUrl}/getAllReglementation`,{withCredentials:true})
  }

   public addMesure(idTarics :number[], mesure:Mesure):Observable<Mesure>{
     let params = new HttpParams();
    idTarics.forEach(id => {
      params = params.append('idTarics', id.toString());
    });
    return this.http.post<Mesure>(`${this.baseUrl}/add`,mesure,{params,withCredentials: true})
   }


  
}
