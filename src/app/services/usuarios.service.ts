import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import type { Usuario } from '../interfaces/usuario';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';

type Body = {
  email: string,
  contraseña: string
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl = 'http://localhost:3000/api/usuarios';
  private httpClient = inject(HttpClient)

  getAll() {
    return lastValueFrom
      (this.httpClient.get<Usuario[]>(`${this.baseUrl}`))
  }

  getById(usuarioId: number) {
    return lastValueFrom
      (this.httpClient.get<Usuario>(`${this.baseUrl}/${usuarioId}`))
  }

  register(body: Usuario) {
    return lastValueFrom
      (this.httpClient.post<Usuario>(`${this.baseUrl}/register`, body))

  }

  login(body: Body) {
    return lastValueFrom(
      this.httpClient.post<Usuario>(`${this.baseUrl}/login`, body)
    );
  }

  isAdmin() {
    const token = localStorage.getItem(environment.tokenName);
    if (!token) return false;
    const data = jwtDecode<{ rol: string, id: number }>(token);
    if (data.rol === 'admin') return true;
    return false;
  }

  update(usuarioId: number, body: Body) {
    return lastValueFrom(
      this.httpClient.put<Usuario>(`${this.baseUrl}/update/${usuarioId}`, body)
    );
  }
}

