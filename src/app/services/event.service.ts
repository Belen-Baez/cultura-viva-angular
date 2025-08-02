import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz para el modelo de evento, incluyendo la nueva propiedad 'imagen'
export interface Evento {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  // La propiedad 'imagen' ahora tendrá la URL completa proporcionada por el backend.
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://127.0.0.1:8000/api/eventos/'; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  createEvent(eventData: FormData): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, eventData);
  }
}
