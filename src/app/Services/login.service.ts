import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../Models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private JwtHelper: JwtHelperService) { }

  login(user: User): Observable<any>{
    return this.http.post(`${API_URL}/api/login`, user, {
      responseType: "text",
    });
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return token && !this.JwtHelper.isTokenExpired(token);
  }
}
