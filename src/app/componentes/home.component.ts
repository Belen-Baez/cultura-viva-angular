import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; text-align: center;">
      <h1>¡BIENVENIDOS A CULTURA VIVA!</h1>
      <p>Explora nuestros eventos y actividades culturales.</p>
    </div>
  `,
  styles: [`
    h1 { color: purple; }
    p { color: #666; }
  `]
})
export class HomeComponent { }
