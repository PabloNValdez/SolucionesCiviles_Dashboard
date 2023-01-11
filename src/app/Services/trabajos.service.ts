import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Trabajo } from '../Models/trabajo.model';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TrabajosService {

  constructor(private http: HttpClient) { }

  createWork(dto): Observable<any>{
    return this.http.post(`${API_URL}/api/trabajo/create`, dto);
  }

  getAllWorks(): Observable<any>{
    return this.http.get(`${API_URL}/api/trabajo/list`);
  }

  deleteWork(id): Observable<any> {
    return this.http.delete(`${API_URL}/api/trabajo/delete/${id}`);
  }

  updateWork(dto): Observable<any>{
    return this.http.put<Trabajo>(`${API_URL}/api/trabajo/update`, dto);
  }
}
