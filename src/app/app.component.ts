import { Component, OnInit } from '@angular/core'; [cite: 62, 185]
import { EventService } from './services/event.service'; // Ajusta la ruta [cite: 63, 185, 186]

@Component({
  selector: 'app-root', // O 'app-events-list' si creaste uno nuevo [cite: 66]
  templateUrl: './app.component.html', [cite: 67]
  styleUrls: ['./app.component.css'] [cite: 68]
})
export class AppComponent implements OnInit {
  title = 'mi-evento-frontend'; [cite: 69]
  events: any[] = []; [cite: 70, 186]
  isLoading: boolean = true; [cite: 71, 193]
  errorMessage: string | null = null; [cite: 72]

  constructor(private eventService: EventService) {} [cite: 73, 187]

  ngOnInit(): void { [cite: 74, 188]
    this.eventService.getEvents().subscribe({ [cite: 75, 187]
      next: (data) => { [cite: 76, 187]
        this.events = data; [cite: 77, 187]
        this.isLoading = false; [cite: 78, 84]
        console.log('Eventos cargados:', this.events); [cite: 79, 187]
      },
      error: (err) => { [cite: 81, 187]
        this.errorMessage = 'Error al cargar eventos. Por favor, inténtalo de nuevo más tarde.'; [cite: 82, 83]
        this.isLoading = false; [cite: 84]
        console.error('Error al cargar eventos:', err); [cite: 85, 187]
      }
    });
  }
}