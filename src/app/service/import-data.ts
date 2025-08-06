import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportData {
  baseUrl =environment.apiUrl;
  constructor(private http : HttpClient){}
  importData (file :File):Observable<any>{
const formData = new FormData();



formData.append('file',file)
    return this.http.post<any>(`${this.baseUrl}/upload`,formData)
  }
}
