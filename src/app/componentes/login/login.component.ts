// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credenciales = {
    username: '',
    password: ''
  };

  mensaje = ''; // Para mostrar mensajes al usuario

  // ✅ COMBINA AMBOS SERVICIOS EN UN SOLO CONSTRUCTOR
  constructor(
    private router: Router,
    private authService: AuthService // Inyecta el AuthService aquí
  ) {}

  iniciarSesion(): void {
    this.mensaje = ''; // Limpia mensajes anteriores

    // ✅ Llama al método login del AuthService para comunicarte con Django
    this.authService.login(this.credenciales).subscribe({
      next: (response) => {
        console.log('Login exitoso desde el backend:', response);
        this.mensaje = 'Inicio de sesión exitoso';
        // Aquí es donde guardarías el token si tu backend lo devuelve
        // Por ejemplo: localStorage.setItem('authToken', response.token);

        this.router.navigate(['/home']); // Redirige al usuario
      },
      error: (error) => {
        console.error('Error en el login desde el backend:', error);
        // Muestra el mensaje de error del backend si está disponible
        this.mensaje = error.error.detail || 'Usuario o contraseña incorrectos.';
      }
    });
  }
}