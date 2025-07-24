import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la interfaz Evento (podés también importarla desde otro archivo si querés)
export interface Evento {
  id: number;
  titulo: string;
  fecha: string; // usualmente en JSON las fechas vienen como string ISO
  descripcion: string;
}

@Injectable({
  providedIn: 'root' // Esto permite que el servicio se inyecte en toda la app automáticamente
})
export class EventService {

  private apiUrl = 'http://localhost:3000/eventos'; // URL base del API (cambiá según tu backend)

  constructor(private http: HttpClient) {}

  // Método para obtener todos los eventos (GET)
  getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Podés agregar más métodos si querés: crear evento, editar, borrar, etc.
}
