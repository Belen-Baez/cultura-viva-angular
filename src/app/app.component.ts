import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventService } from './services/event.service'; // ✅ Importar servicio

interface Evento {
  id: number;
  titulo: string;
  fecha: Date;
  descripcion: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cultura-viva-angular';
  mensajeVisible: boolean = false;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  events: Evento[] = [];

  constructor(private eventService: EventService) {} // ✅ Inyectar el servicio

  ngOnInit(): void {
    this.fetchEvents();
  }

  mostrarMensaje(): void {
    this.mensajeVisible = true;
    setTimeout(() => {
      this.mensajeVisible = false;
    }, 3000);
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al conectar con el backend';
        console.error('Error al obtener eventos:', err);
        this.isLoading = false;
      }
    });
  }
}
