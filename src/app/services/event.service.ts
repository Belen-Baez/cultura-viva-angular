// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
  id: number;
  titulo: string;
  fecha: Date;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://127.0.0.1:8000/api/events/'; // <-- ¡Asegúrate de que esta sea la URL correcta para tus eventos!

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Evento[]> {
    // Esto es un GET, lo cual es correcto para OBTENER eventos
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Si también tienes un método para crear eventos, debería ser POST:
  createEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, eventData);
  }
}