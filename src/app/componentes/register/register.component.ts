import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  mensajeTipo: 'exito' | 'error' | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  registrarUsuario() {
    if (this.usuario.username && this.usuario.password && this.usuario.email) {
      this.mensaje = '';
      this.mensajeTipo = null;

      this.authService.register(this.usuario).subscribe({
        next: () => {
          this.mensaje = 'Usuario registrado exitosamente';
          this.mensajeTipo = 'exito';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (err) => {
          this.mensaje = err.error?.detail || 'Error al registrar usuario';
          this.mensajeTipo = 'error';
        }
      });
    } else {
      this.mensaje = 'Todos los campos son obligatorios';
      this.mensajeTipo = 'error';
    }
  }
}

