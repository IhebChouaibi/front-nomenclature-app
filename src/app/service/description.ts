import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Description } from '../models/description';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
    private baseUrl = environment.apiUrl; 
  
 constructor(private http: HttpClient) {}
 

 addDescription (idNomenclature:number , description :Description):Observable<Description> {
    return this.http.post<Description>(`${this.baseUrl}/description/add?id=${idNomenclature}`, description, { withCredentials: true });
  } 

  
}
