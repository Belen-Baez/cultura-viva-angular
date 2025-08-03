import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Evento } from '../services/event.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  events: Evento[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  selectedFile: File | null = null;

  editingEventId: number | null = null;

  eventoForm: FormGroup;

  mensajeVisible = false;
  mensajeTexto = '';

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    this.eventoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventService.getEvents().subscribe({
      next: (data: Evento[]) => {
        this.events = data || [];
        if (this.events.length === 0) {
          this.errorMessage = 'No hay eventos disponibles.';
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Error al obtener eventos: ' + (err.message || err.statusText);
        console.error('Error al obtener eventos:', err);
        this.isLoading = false;
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  submitEvento(): void {
    if (this.eventoForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('titulo', this.eventoForm.get('titulo')?.value);
    formData.append('descripcion', this.eventoForm.get('descripcion')?.value);
    formData.append('fecha', this.eventoForm.get('fecha')?.value);

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    if (this.editingEventId) {
      // Editar evento
      this.eventService.updateEvent(this.editingEventId, formData).subscribe({
        next: () => {
          this.fetchEvents();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar evento:', err);
          this.errorMessage = 'Error al actualizar el evento.';
          this.isLoading = false;
        }
      });
    } else {
      // Crear nuevo evento
      this.eventService.createEvent(formData).subscribe({
        next: () => {
          this.fetchEvents();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al crear evento:', err);
          this.errorMessage = 'Error al crear el evento.';
          this.isLoading = false;
        }
      });
    }
  }

  resetForm(): void {
    this.eventoForm.reset();
    this.selectedFile = null;
    this.editingEventId = null;
    this.fileInput.nativeElement.value = '';
    this.isLoading = false;
  }

  comprarTicket(event: Evento): void {
    if (!this.authService.isLoggedIn()) {
      this.mensajeTexto = 'Debe iniciar sesión para poder comprar la entrada.';
      this.mensajeVisible = true;
      return;
    }

    this.mensajeTexto = `Gracias por tu interés en "${event.titulo}". ¡Te enviaremos información acerca de la venta de tickets!`;
    this.mensajeVisible = true;
  }

  cerrarMensaje(): void {
    this.mensajeVisible = false;
  }

  editarEvento(evento: Evento): void {
    this.eventoForm.patchValue({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha
    });
    this.selectedFile = null;
    this.editingEventId = evento.id!;
  }

  eliminarEvento(evento: Evento): void {
    if (!confirm(`¿Estás segura de que querés eliminar "${evento.titulo}"?`)) return;

    this.isLoading = true;
    this.eventService.deleteEvent(evento.id!).subscribe({
      next: () => {
        this.fetchEvents();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al eliminar evento:', err);
        this.errorMessage = 'No se pudo eliminar el evento.';
        this.isLoading = false;
      }
    });
  }
}
