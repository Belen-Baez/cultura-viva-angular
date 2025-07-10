import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home.component';
import { EventosComponent } from './componentes/eventos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta por defecto
  { path: 'home', component: HomeComponent },
  { path: 'eventos', component: EventosComponent },
  // Añade más rutas si las necesitas
  { path: '**', redirectTo: 'home' } // Redirige a home si la ruta no existe
];