import { Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mi-evento-frontend';
  events: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
        console.log('Eventos cargados:', this.events);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar eventos. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
        console.error('Error al cargar eventos:', err);
      }
    });
  }
}