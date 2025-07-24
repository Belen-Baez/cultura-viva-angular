// Importamos lo necesario de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf, *ngFor, pipes, etc.
import { HttpClientModule } from '@angular/common/http'; // Para usar servicios HTTP

// Importamos el servicio que trae los eventos
import { EventService } from '../services/event.service'; // Verificá que la ruta sea correcta

@Component({
  selector: 'app-eventos',
  standalone: true, // 💡 Clave para que el componente funcione sin módulo tradicional
  imports: [CommonModule, HttpClientModule], // Módulos necesarios importados aquí mismo
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  // Variable para guardar los eventos que llegan del backend
  eventos: any[] = [];

  // Inyectamos el servicio
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Al iniciar el componente, se llama al backend para obtener eventos
    this.eventService.getEvents().subscribe(
      (data) => {
        this.eventos = data;
        console.log('Eventos cargados:', this.eventos);
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
      }
    );
  }
}
