import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notes } from '../models/notes' ;
@Injectable({
  providedIn: 'root'
})
export class NotesService {
     private baseUrl = environment.apiUrl+'/notes'; 
  
 constructor(private http: HttpClient) {}
  addNotesToTaric(idNomenclature:number , notes: Notes ): Observable<Notes> {
  
    return this.http.post<Notes>(`${this.baseUrl}/add?idNomenclature=${idNomenclature}`, notes, { withCredentials: true });
  }
   
updateNote(idNote: number, notesDto: Notes): Observable<Notes> {
    const params = new HttpParams().set('idNote', idNote.toString());
    return this.http.patch<Notes>(`${this.baseUrl}/update`, notesDto, { params });
  }

  deleteNote(idNote: number): Observable<void> {
    const params = new HttpParams().set('idNote', idNote.toString());
    return this.http.delete<void>(`${this.baseUrl}/delete`, { params });
  }
  
  addNotesToTarics(ids: number[], notesDto: Notes): Observable<Notes> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', id.toString());
    });
   
    return this.http.post<Notes>(`${this.baseUrl}/addToTarics`, notesDto, { params,withCredentials:true });
  }
  
}
