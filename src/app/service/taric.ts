import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { TARIC } from '../models/taric';
import { PageResponse } from '../models/page-response';
import { Observable } from 'rxjs';
import { Suffix } from '../models/suffix';
import { Notes } from '../models/notes';

@Injectable({
  providedIn: 'root'
})
export class Taric {
    private baseUrl = environment.apiUrl; 
  
 constructor(private http: HttpClient) {}

 
   searchTaricByCode(codeTaric: string , page=0,size =20): Observable <PageResponse<TARIC>> {
    const params = new HttpParams()
      .set('codeTaric', codeTaric)
      .set('page', page.toString())
      .set('size', size.toString());
      
      return this.http.get<PageResponse<TARIC>>(`${this.baseUrl}/taric/search`, { params, withCredentials: true });
    }
  getSuffix(idSuffix : number):Observable<Suffix> {
    return this.http.get<Suffix>(`${this.baseUrl}/taric/suffix/${idSuffix}`, { withCredentials: true });
  }
  addNotesToTaric(idNomenclature:number , notes: Notes): Observable<Notes> {
  
    return this.http.post<Notes>(`${this.baseUrl}/taric/addnote?id=${idNomenclature}`, notes, { withCredentials: true });
  }
  
}
