import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service'; // Importamos el servicio que se conecta al backend

// Definimos la estructura de un evento (opcional pero útil)
interface Evento {
  id: number;
  titulo: string;
  fecha: Date;
  descripcion: string;
}

@Component({
  selector: 'app-eventos',
  standalone: true, // Esto indica que este componente no depende de un módulo específico
  imports: [CommonModule], // Importamos módulos comunes de Angular como ngIf, ngFor, etc.
  template: `
    <div style="padding: 20px;">
      <h2>Nuestros Eventos</h2>

      <!-- Mensaje de carga -->
      <p *ngIf="isLoading">Cargando eventos...</p>

      <!-- Mensaje de error -->
      <p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>

      <!-- Lista de eventos si se cargaron correctamente -->
      <ul *ngIf="!isLoading && !errorMessage && events.length > 0">
        <li *ngFor="let evento of events">
          <strong>{{ evento.titulo }}</strong><br>
          {{ evento.fecha | date:'fullDate' }}<br>
          {{ evento.descripcion }}<br><br>
        </li>
      </ul>

      <!-- Mensaje si no hay eventos -->
      <p *ngIf="!isLoading && events.length === 0">No hay eventos disponibles.</p>
    </div>
  `,
  styles: [`
    h2 { color: #333; }
    p, li { color: #555; }
  `]
})
export class EventosComponent implements OnInit {
  // Atributos del componente
  events: Evento[] = [];           // Almacenará los eventos que vienen del backend
  isLoading = true;                // Estado de carga
  errorMessage: string | null = null; // Mensaje de error (si lo hay)

  // Inyectamos el servicio que se conecta con el backend
  constructor(private eventService: EventService) {}

  // Este método se ejecuta automáticamente al iniciar el componente
  ngOnInit(): void {
    // Llamamos al backend para obtener los eventos
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;     // Guardamos los eventos recibidos
        this.isLoading = false; // Dejamos de mostrar "Cargando..."
      },
      error: (err) => {
        this.errorMessage = 'Error al conectar con el backend.';
        console.error('Error al obtener eventos:', err); // Mostramos en consola el error técnico
        this.isLoading = false;
      }
    });
  }
}
