import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Necesario para [(ngModel)] y ngForm
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario = {
    username: '',
    password: '',
    email: ''
  };

  mensaje = '';

  constructor(private router: Router) {}

  registrarUsuario() {
    if (this.usuario.username && this.usuario.password && this.usuario.email) {
      this.mensaje = 'Usuario registrado exitosamente';
      this.router.navigate(['/login']);
    } else {
      this.mensaje = 'Todos los campos son obligatorios';
    }
  }
}
