import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../models/section';
import { PageResponse } from '../models/page-response';
import { AuthService } from './auth-service';
import { environment } from '../../enviroment/enviroment';
import { Chapitre } from '../models/chapitre';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = environment.apiUrl; 

  constructor(private http:HttpClient){}
  


getSection(page: number = 0, size: number = 7): Observable<PageResponse<Section>>  {
  

    return this.http.get<PageResponse<Section>>(`${this.baseUrl}/section?page=${page}&size=${size}`, { withCredentials: true });
  }

  searchSection(libelle: string): Observable<Section> {
    return this.http.get<Section>(
      `${this.baseUrl}/section/search?libelleSection=${encodeURIComponent(libelle)}`,
      
    );
  }
  create<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { withCredentials: true });
  }

  update<T>(endpoint: string, id: number, data: any): Observable<T> {
    
  const paramName = endpoint.includes('Section') ? 'idSection' : 'idChapitre';
    const params = new HttpParams().set(paramName, id.toString());
        return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data, { 
      params,
      withCredentials: true 
    });
  }

  delete(endpoint: string, id: number): Observable<void> {
  const paramName = endpoint.includes('Section') ? 'idSection' : 'idChapitre';
    const params = new HttpParams().set(paramName, id.toString());
        return this.http.delete<void>(`${this.baseUrl}/${endpoint}`, { 
      params,
      withCredentials: true 
    });
  }
  



}
