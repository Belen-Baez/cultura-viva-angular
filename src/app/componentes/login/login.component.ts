import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 💡 Para usar [(ngModel)] y ngForm
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ Standalone
  imports: [CommonModule, FormsModule], // ✅ Importa módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credenciales = {
    username: '',
    password: ''
  };

  mensaje = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.credenciales.username === 'admin' && this.credenciales.password === 'admin') {
      this.mensaje = 'Inicio de sesión exitoso';
      this.router.navigate(['/home']);
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }
}
