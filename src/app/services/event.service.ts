import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para evento
export interface Evento {
  id?: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://127.0.0.1:8000/api/eventos/';

  constructor(private http: HttpClient) { }

  // Obtener todos los eventos
  getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Crear evento (con token de autenticación)
  createEvent(eventData: FormData): Observable<Evento> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.post<Evento>(this.apiUrl, eventData, { headers });
  }

  // Eliminar evento por id (con token)
  deleteEvent(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }

  // (Opcional) Actualizar evento por id (con token)
  updateEvent(id: number, eventData: FormData): Observable<Evento> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.put<Evento>(`${this.apiUrl}${id}/`, eventData, { headers });
  }
}