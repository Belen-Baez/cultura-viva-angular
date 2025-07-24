// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { HomeComponent } from './componentes/home.component';
import { EventosComponent } from './componentes/eventos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'contactos', component: ContactosComponent }
];
