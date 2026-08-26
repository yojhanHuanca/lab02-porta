import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { UsuarioService } from '../../core/usuario.service';
import { Usuario, UsuarioForm } from '../../core/usuario.model';

const EMPTY_FORM: UsuarioForm = { nombre: '', correo: '', telefono: '', rol: 'usuario' };

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  private usuarioService = inject(UsuarioService);

  readonly usuarios = signal<Usuario[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly search = signal('');

  readonly form = signal<UsuarioForm>({ ...EMPTY_FORM });
  readonly editingId = signal<number | null>(null);
  readonly deletingId = signal<number | null>(null);
  readonly formOpen = signal(false);

  readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const list = this.usuarios();
    if (!term) return list;
    return list.filter(
      (u) =>
        u.nombre.toLowerCase().includes(term) ||
        u.correo.toLowerCase().includes(term) ||
        (u.rol ?? '').toLowerCase().includes(term),
    );
  });

  readonly isEditing = computed(() => this.editingId() !== null);

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  fetchUsuarios(): void {
    this.loading.set(true);
    this.error.set(null);
    this.usuarioService.list().subscribe({
      next: (data) => {
        this.usuarios.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con la API. Verifica que el backend esté activo.');
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form.set({ ...EMPTY_FORM });
    this.formOpen.set(true);
  }

  openEdit(usuario: Usuario): void {
    this.editingId.set(usuario.id);
    this.form.set({
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono ?? '',
      rol: usuario.rol,
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.editingId.set(null);
    this.form.set({ ...EMPTY_FORM });
  }

  updateField<K extends keyof UsuarioForm>(field: K, value: UsuarioForm[K]): void {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  submit(): void {
    const data = this.form();
    if (!data.nombre.trim() || !data.correo.trim()) return;

    this.saving.set(true);
    this.error.set(null);

    const id = this.editingId();
    const request = id ? this.usuarioService.update(id, data) : this.usuarioService.create(data);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.closeForm();
        this.fetchUsuarios();
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err?.error?.error ?? 'No se pudo guardar el usuario.');
      },
    });
  }

  confirmDelete(id: number): void {
    this.deletingId.set(id);
  }

  cancelDelete(): void {
    this.deletingId.set(null);
  }

  remove(id: number): void {
    this.usuarioService.remove(id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.fetchUsuarios();
      },
      error: () => {
        this.deletingId.set(null);
        this.error.set('No se pudo eliminar el usuario.');
      },
    });
  }
}
