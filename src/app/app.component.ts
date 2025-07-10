import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'cultura-viva-angular'; 

 
  mensajeVisible: boolean = false; 
  mostrarMensaje(): void {
    this.mensajeVisible = true;
    
    setTimeout(() => {
      this.mensajeVisible = false;
    }, 3000); 
  }
}