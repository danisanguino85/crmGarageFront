import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import type { Cliente } from '../interfaces/cliente';



@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:3000/api/clientes'
  private clienteSeleccionado: Cliente | null = null;


  getAll() {
    return lastValueFrom(
      this.httpClient.get<Cliente[]>(this.baseUrl)
    )
  }
  getById(clienteId: number) {
    return lastValueFrom(
      this.httpClient.get<Cliente>(`${this.baseUrl}/${clienteId}`)
    )
  }
  getByTelefono(body: string) {
    return lastValueFrom(
      this.httpClient.post<Cliente>(`${this.baseUrl}/tel`, body)
    )
  }
  getByEmail(body: string) {
    return lastValueFrom(
      this.httpClient.post<Cliente>(`${this.baseUrl}/mail`, body)
    )
  }

  register(body: Cliente) {
    return lastValueFrom(
      this.httpClient.post<Cliente>(`${this.baseUrl}/registro`, body)
    )
  }

  update(clienteId: number, body: Cliente) {
    return lastValueFrom(
      this.httpClient.put<Cliente>(`${this.baseUrl}/${clienteId}`, body)
    )
  }

  getClienteByReparacion(reparacionId: number) {
    return lastValueFrom(
      this.httpClient.get<Cliente>(`${this.baseUrl}/cliente/${reparacionId}`)
    )
  }

  // Método para almacenar un cliente
  setCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
  }

  // Método para obtener el cliente almacenado
  getCliente(): Cliente | null {
    return this.clienteSeleccionado;
  }


}
