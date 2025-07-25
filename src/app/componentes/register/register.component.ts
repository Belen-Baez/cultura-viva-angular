import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ajustá la ruta según tu proyecto

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

  constructor(private router: Router, private authService: AuthService) {}

  registrarUsuario() {
    if (this.usuario.username && this.usuario.password && this.usuario.email) {
      this.authService.register(this.usuario).subscribe({
        next: () => {
          this.mensaje = 'Usuario registrado exitosamente';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.mensaje = 'Error al registrar usuario';
          console.error(err);
        }
      });
    } else {
      this.mensaje = 'Todos los campos son obligatorios';
    }
  }
}
