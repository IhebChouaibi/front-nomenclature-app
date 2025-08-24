import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notes } from '../models/notes' ;
@Injectable({
  providedIn: 'root'
})
export class NotesService {
     private baseUrl = environment.apiUrl; 
  
 constructor(private http: HttpClient) {}
  addNotesToTaric(idNomenclature:number , notes: Notes ): Observable<Notes> {
  
    return this.http.post<Notes>(`${this.baseUrl}/taric/addnote?idNomenclature=${idNomenclature}`, notes, { withCredentials: true });
  }
  

  
}
