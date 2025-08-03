import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
export class AuthService {
  // Retorna true si hay token guardado (usuario logueado)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

