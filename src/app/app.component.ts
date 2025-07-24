import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EventService } from './services/event.service';
import { routes } from './app.routes'; // 👈 Importa las rutas correctamente

interface Evento {
  id: number;
  titulo: string;
  fecha: Date;
  descripcion: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})          


export class AppComponent implements OnInit {
  title = 'cultura-viva-angular';

  mensajeVisible = false;
  isLoading = true;
  errorMessage: string | null = null;
  events: Evento[] = [];

  constructor(private eventService: EventService) {}

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
      next: (data: any[]) => {
        if (data && data.length > 0) {
          this.events = data.map(e => ({
            id: e.id,
            titulo: e.titulo,
            fecha: new Date(e.fecha),
            descripcion: e.descripcion
          }));
        } else {
          this.events = [];
          this.errorMessage = 'No hay eventos disponibles.';
        }
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

