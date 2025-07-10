import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';

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
  constructor() { } 

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

   
    setTimeout(() => {
      try {
        
        this.events = [
          { id: 1, titulo: 'Concierto de Jazz', fecha: new Date('2025-08-15'), descripcion: 'Noche de jazz en el parque.' },
          { id: 2, titulo: 'Exposición de Arte Moderno', fecha: new Date('2025-09-01'), descripcion: 'Explorando las últimas tendencias.' },
          { id: 3, titulo: 'Festival Gastronómico', fecha: new Date('2025-10-10'), descripcion: 'Sabores del mundo en un solo lugar.' }
        ];
      } catch (error) {
        this.errorMessage = 'No se pudieron cargar los eventos. Inténtalo de nuevo más tarde.';
        console.error('Error al cargar eventos:', error);
      } finally {
        this.isLoading = false;
      }
    }, 2000); 
  }
}