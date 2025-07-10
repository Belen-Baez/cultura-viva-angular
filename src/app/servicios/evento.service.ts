import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:8000/api/eventos/';

  constructor(private http: HttpClient) {}

  obtenerEventos() {
    return this.http.get(this.apiUrl);
  }
}
