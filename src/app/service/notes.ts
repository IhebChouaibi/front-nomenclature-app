import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Notes {
     private baseUrl = environment.apiUrl; 
  
 constructor(private http: HttpClient) {}
  addNotesToTaric(idNomenclature:number , notes: Notes): Observable<Notes> {
  
    return this.http.post<Notes>(`${this.baseUrl}/taric/addnote?id=${idNomenclature}`, notes, { withCredentials: true });
  }
  

  
}
