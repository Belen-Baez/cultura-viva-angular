import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  mensaje = '';
  mensajeTipo: 'exito' | 'error' | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  iniciarSesion(): void {
  this.mensaje = '';
  this.mensajeTipo = null;

  this.authService.login(this.credenciales).subscribe({
    next: (response: any) => {
      console.log('Login exitoso desde el backend:', response);
      this.mensaje = 'Inicio de sesión exitoso';
      this.mensajeTipo = 'exito';

      setTimeout(() => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      }, 1000);
    },
    error: (err: any) => {
      // Mostramos mensaje personalizado sin importar el texto exacto del backend
      this.mensaje = 'Usuario o contraseña incorrectos';
      this.mensajeTipo = 'error';
    }
  });
}}