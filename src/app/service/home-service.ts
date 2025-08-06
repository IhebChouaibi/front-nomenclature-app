import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../models/section';
import { PageResponse } from '../models/page-response';
import { AuthService } from './auth-service';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = environment.apiUrl; 

  constructor(private http:HttpClient,private authService : AuthService){}
  


getSection(page: number = 0, size: number = 7): Observable<PageResponse<Section>>  {
  

    return this.http.get<PageResponse<Section>>(`${this.baseUrl}?page=${page}&size=${size}`, { withCredentials: true });
  }

  searchSection(libelle: string): Observable<Section> {
    return this.http.get<Section>(
      `${this.baseUrl}/section/search?libelleSection=${encodeURIComponent(libelle)}`,
      
    );
  }


}
