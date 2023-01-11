import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Obtén el token JWT del almacenamiento local
        const token = localStorage.getItem('token');

        if (token) {
            // Clona la solicitud y agrega el token a la cabecera de autorización
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });

            // Pasamos la solicitud clonada al siguiente manejador
            return next.handle(cloned);
        } else {
            // Si no hay token, pasamos la solicitud sin cambios
            return next.handle(req);
        }
    }
}
