import { Injectable } from '@angular/core'; [cite: 40, 163]
import { HttpClient } from '@angular/common/http'; [cite: 41, 164]
import { Observable } from 'rxjs'; [cite: 42, 165]
import { environment } from '../../environments/environment'; [cite: 43, 166]

@Injectable({
  providedIn: 'root' [cite: 46, 169]
})
export class EventService {
  private apiUrl = environment.apiUrl; [cite: 48, 171]

  constructor(private http: HttpClient) {} [cite: 49, 172]

  getEvents(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.apiUrl}/events`); [cite: 52, 176]
  }

  getEventById(id: number): Observable<any> { [cite: 53]
    return this.http.get<any>(`${this.apiUrl}/events/${id}`); [cite: 54, 178]
  }
}