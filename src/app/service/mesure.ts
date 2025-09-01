import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Mesure } from '../models/mesure';
import { Observable } from 'rxjs';
import { MouvementCommercial } from '../models/mouvement-commercial';
import { Reglementation } from '../models/reglementation';
import { PageResponse } from '../models/page-response';
import { MesureResponse } from '../models/mesure-response';

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


  public getMesureByStatus(statut : 'EN_ATTENTE'|'APPROUVE' |'REFUSE',page: number = 0, size: number = 10):Observable<PageResponse<Mesure>>{
    return this.http.get<PageResponse<Mesure>>(`${this.baseUrl}/getMesureByStatut?statut=${statut}&page=${page}&size=${size}`)
  }


public traiterMesureStatus(codeStatus : string ,commentaire:string,responsableId:number,idMesure:number []):Observable<Mesure[]>{
   const validationRequest = {
    codeStatut: codeStatus,
    commentaire: commentaire
  };  
  let params = new HttpParams();
    idMesure.forEach(id => {
      params = params.append('idMesures', id.toString());
    });
    params = params.append('responsableId', responsableId.toString());
  return this.http.post<Mesure[]>(`${this.baseUrl}/validation`,
    validationRequest,
    { params, withCredentials: true });
}
  
getMesureById(idMesure:number):Observable<MesureResponse>{
  return this.http.get<MesureResponse>(`${this.baseUrl}/getMesureById?idMesure=${idMesure}`);
}



}
