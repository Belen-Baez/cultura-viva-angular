import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> { // Asumimos que devuelve un array de eventos
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/events/${id}`);
  }
}