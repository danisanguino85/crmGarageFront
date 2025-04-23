import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import type { Usuario } from '../interfaces/usuario';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/enviroment';

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
  private usuarioActual: Usuario | null = null;

  getAll() {
    return lastValueFrom
      (this.httpClient.get<Usuario[]>(`${this.baseUrl}`))
  }

  getMecanico() {
    return lastValueFrom
      (this.httpClient.get<Usuario[]>(`${this.baseUrl}/mecanico`))
  }

  getUsuario(): Usuario | null {
    return this.usuarioActual;
  }

  setUsuario(usuario: Usuario) {
    this.usuarioActual = usuario;
  }

  getAdmin() {
    return lastValueFrom
      (this.httpClient.get<Usuario[]>(`${this.baseUrl}/admin`))
  }

  getById(usuarioId: number) {
    return lastValueFrom
      (this.httpClient.get<Usuario>(`${this.baseUrl}/${usuarioId}`))
  }

  getByEmail(body: string) {
    return lastValueFrom(
      this.httpClient.post<Usuario>(`${this.baseUrl}/email`, body)
    )
  }

  getMecanicoByReparacion(reparacionId: number) {
    return lastValueFrom(
      this.httpClient.get<Usuario>(`${this.baseUrl}/mecanico/${reparacionId}`)
    )
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

  isMecanico() {
    const token = localStorage.getItem(environment.tokenName);
    if (!token) return false;
    const data = jwtDecode<{ rol: string, id: number }>(token);
    if (data.rol === 'mecanico') return true;
    return false;
  }

  tokenDecodificado() {
    const token = localStorage.getItem(environment.tokenName);
    if (!token) return null;

    const data = jwtDecode<{ rol: string, id: number }>(token);
    return data;
  }

  update(usuarioId: number, body: Body) {
    return lastValueFrom(
      this.httpClient.put<Usuario>(`${this.baseUrl}/update/${usuarioId}`, body)
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  updateFoto(data: FormData | any, id: number) {
    return lastValueFrom(
      this.httpClient.put<Usuario>(`${this.baseUrl}/imagen/${id}`, data)

    )
  }

  isLogged() {
    const token = localStorage.getItem(environment.tokenName);
    if (!token) return false;
    return true
  }
}

