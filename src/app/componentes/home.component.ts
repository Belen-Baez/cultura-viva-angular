import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; text-align: center;">
      <h2>¡Bienvenido a Cultura Viva!</h2>
      <p>Explora nuestros eventos y actividades culturales.</p>
    </div>
  `,
  styles: [`
    h2 { color: #333; }
    p { color: #666; }
  `]
})
export class HomeComponent { }