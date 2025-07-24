import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // ✅ Importar esto
import 'zone.js'; // ✅ necesario para Angular

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // ✅ Esto habilita HttpClient en la app
  ]
}).catch(err => console.error(err));
