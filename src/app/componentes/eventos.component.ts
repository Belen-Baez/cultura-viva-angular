import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Evento } from '../services/event.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  events: Evento[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  eventoForm: FormGroup;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.eventoForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      fecha: [''],
      imagen: [null]
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
    this.eventoForm.patchValue({ imagen: file });
  }

  submitEvento(): void {
    const formData = new FormData();
    formData.append('titulo', this.eventoForm.get('titulo')?.value);
    formData.append('descripcion', this.eventoForm.get('descripcion')?.value);
    formData.append('fecha', this.eventoForm.get('fecha')?.value);
    if (this.eventoForm.get('imagen')?.value) {
      formData.append('imagen', this.eventoForm.get('imagen')?.value);
    }

    this.eventService.createEvent(formData).subscribe({
  next: () => {
    this.fetchEvents();
    this.eventoForm.reset();
  },
  error: (err: any) => {
    console.error('Error al crear evento:', err);
    this.errorMessage = 'Error al crear el evento.';
  }
});
}}
