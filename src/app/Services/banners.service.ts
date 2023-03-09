import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(private http: HttpClient) { }

  getAllPubliImages(): Observable<any>{
    return this.http.get(`${API_URL}/api/publiImage/list`);
  }

  createBanner(dto): Observable<any>{
    return this.http.post(`${API_URL}/api/publiImage/create`, dto);
  }

  deleteBanner(id): Observable<any> {
    return this.http.delete(`${API_URL}/api/publiImage/delete/${id}`);
  }

  updateBanner(dto): Observable<any>{
    return this.http.post(`${API_URL}/api/publiImage/update`, dto);
  }
}
