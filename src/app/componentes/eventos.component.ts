import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventos',
  standalone: true, 
  imports: [CommonModule], 
  template: `
    <div style="padding: 20px; text-align: center;">
      <h2>Nuestros Eventos</h2>
      <p>Aquí encontrarás una lista de todos los próximos eventos.</p>
     
    </div>
  `,
  styles: [`
    h2 { color: #333; }
    p { color: #666; }
  `]
})
export class EventosComponent { }