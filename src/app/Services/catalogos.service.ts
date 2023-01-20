import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }

  getAllCatalogos(): Observable<any>{
    return this.http.get(`${API_URL}/api/catalogo/list`);
  }

  deleteCatalogo(id): Observable<any> {
    return this.http.delete(`${API_URL}/api/catalogo/delete/${id}`);
  }

  updateCatalogo(dto): Observable<any>{
    return this.http.post(`${API_URL}/api/catalogo/update`, dto);
  }

  createCatalogo(dto): Observable<any>{
    return this.http.post(`${API_URL}/api/catalogo/create`, dto);
  }
}
