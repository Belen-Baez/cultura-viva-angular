// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api/users/'; // O la URL base de tu API de usuarios

  constructor(private http: HttpClient) { }

  // 1. Método para REGISTRAR un nuevo usuario (UserCreateAPIView)
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // ¡IMPORTANTE! Usar .post()
    return this.http.post(`${this.baseUrl}register/`, userData, { headers });
  }

  // 2. Método para INICIAR SESIÓN (Necesitarás una LoginAPIView en Django)
  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // ¡IMPORTANTE! Usar .post()
    return this.http.post(`${this.baseUrl}login/`, credentials, { headers });
  }

  // Puedes añadir otros métodos como logout, obtener perfil, etc.
}
