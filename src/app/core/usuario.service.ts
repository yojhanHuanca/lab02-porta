import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Usuario, UsuarioForm } from './usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/usuarios`;

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  create(data: UsuarioForm): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, data);
  }

  update(id: number, data: UsuarioForm): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
