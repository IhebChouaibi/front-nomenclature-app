import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../models/section';
import { PageResponse } from '../models/page-response';
import { AuthService } from './auth-service';
import { environment } from '../../enviroment/enviroment';
import { Chapitre } from '../models/chapitre';
import { TARIC } from '../models/taric';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = environment.apiUrl; 

  constructor(private http:HttpClient){}
  


getSection(page: number = 0, size: number = 7): Observable<PageResponse<Section>>  {
  

    return this.http.get<PageResponse<Section>>(`${this.baseUrl}/section?page=${page}&size=${size}`, { withCredentials: true });
  }

  searchTaricByCode(codeTaric: string , page=0,size =20): Observable <PageResponse<TARIC>> {
  const params = new HttpParams()
    .set('codeTaric', codeTaric)
    .set('page', page.toString())
    .set('size', size.toString());
    
    return this.http.get<PageResponse<TARIC>>(`${this.baseUrl}/taric/search`, { params, withCredentials: true });
  }
  create<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { withCredentials: true });
  }

  update<T>(endpoint: string, id: number, data: any): Observable<T> {
    if (endpoint==='updateSection'  ) {
      return this.http.patch<T>(`${this.baseUrl}/${endpoint}/${id}`, data, { withCredentials: true });
    }
  
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}/${id}`, data, { withCredentials: true });
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
