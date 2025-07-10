import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // NECESARIO para *ngFor

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule], // IMPORTACIÓN OBLIGATORIA EN STANDALONE
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'], // Este archivo debe existir o eliminarse esta línea
})
export class EventosComponent {
  eventos = [
    { titulo: 'Angular Connect', fecha: new Date('2025-08-10') },
    { titulo: 'NodeConf', fecha: new Date('2025-08-20') },
  ];
}
