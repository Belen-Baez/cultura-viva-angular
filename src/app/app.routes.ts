import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home.component';
import { EventosComponent } from './componentes/eventos.component';
import { LoginComponent } from './componentes/login/login';
import { InformacionComponent } from './componentes/informacion/informacion';
import { ContactosComponent } from './componentes/contactos/contactos';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'contactos', component: ContactosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
