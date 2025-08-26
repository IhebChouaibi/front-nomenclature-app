import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { TARIC } from '../models/taric';
import { PageResponse } from '../models/page-response';
import { Observable } from 'rxjs';
import { Suffix } from '../models/suffix';
import { Notes } from '../models/notes';
import { TaricWithDetailsRequest } from '../models/taric-with-details-request';

@Injectable({
  providedIn: 'root'
})
export class Taric {
    private baseUrl = environment.apiUrl + '/taric'; 
  private selectedTaric: any;

 constructor(private http: HttpClient) {}

  createTaric(request: TaricWithDetailsRequest): Observable<TARIC> {
    return this.http.post<TARIC>(`${this.baseUrl}/addTaric`, request, { withCredentials: true });
  }



 
   searchTaricByCode(codeTaric: string , page=0,size =20): Observable <PageResponse<TARIC>> {
    const params = new HttpParams()
      .set('codeTaric', codeTaric)
      .set('page', page.toString())
      .set('size', size.toString());
      
      return this.http.get<PageResponse<TARIC>>(`${this.baseUrl}/search`, { params, withCredentials: true });
    }
  getSuffix(idSuffix : number):Observable<Suffix> {
    return this.http.get<Suffix>(`${this.baseUrl}/suffix/${idSuffix}`, { withCredentials: true });
  }

  addSuffix(idNomenclature : number,suffix: Suffix): Observable<Suffix> {
    return this.http.post<Suffix>(`${this.baseUrl}/addSuffix/${idNomenclature}`, suffix, { withCredentials: true });
  } 
  getTaricById(idNomenclature : number):Observable<TARIC>{
    return this.http.get<TARIC>(`${this.baseUrl}/getTaricById?idTaric=${idNomenclature}` ,{withCredentials :true});
  }

  setTaric(taric: any) {
    this.selectedTaric = taric;
  }

  getTaric() {
    return this.selectedTaric;
  }

}
