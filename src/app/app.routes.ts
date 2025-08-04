// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { EventosComponent } from './componentes/eventos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { InformacionComponent } from './componentes/informacion/informacion.component';
import { ContactosComponent } from './componentes/contactos/contactos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  { path: 'eventos', component: EventosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'contactos', component: ContactosComponent }
];
