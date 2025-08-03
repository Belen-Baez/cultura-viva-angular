// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api/users/';

  constructor(private http: HttpClient) {}

  // 1. Registrar nuevo usuario
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}register/`, userData, { headers });
  }

  // 2. Iniciar sesión
  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return new Observable(observer => {
      this.http.post(`${this.baseUrl}login/`, credentials, { headers }).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('isAdmin', res.is_staff); // 🔴 Guardamos si es admin
          observer.next(res);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }
 // 3. Verifica si está logueado
 isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }
  
// 4. Verifica si el usuario está logueado
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

  // 5. Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }
}