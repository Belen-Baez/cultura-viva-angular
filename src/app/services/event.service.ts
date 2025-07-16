import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8000/api/eventos';  // ✅ URL correcta

  constructor(private http: HttpClient) {}

 getEvents(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/events/`);
}

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`); // ✅ con slash al final
  }
}
