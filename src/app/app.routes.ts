import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home.component';
import { EventosComponent } from './componentes/eventos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventos', component: EventosComponent },
];
