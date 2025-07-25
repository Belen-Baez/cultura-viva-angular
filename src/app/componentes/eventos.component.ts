import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Evento } from '../services/event.service'; // Asegúrate de importar Evento

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  events: Evento[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventService.getEvents().subscribe({
      next: (data: Evento[]) => { // <-- ¡Tipado explícito para 'data'!
        if (data && data.length > 0) {
          this.events = data.map(e => ({
            id: e.id,
            titulo: e.titulo,
            fecha: e.fecha, // Ya es string, no necesitas new Date() aquí
            descripcion: e.descripcion
          }));
        } else {
          this.events = [];
          this.errorMessage = 'No hay eventos disponibles.';
        }
        this.isLoading = false;
      },
      error: (err: any) => { // <-- ¡Tipado explícito para 'err'!
        this.errorMessage = 'Error al obtener eventos: ' + (err.message || err.statusText);
        console.error('Error al obtener eventos:', err);
        this.isLoading = false;
      }
    });
  }
}


