import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import type { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:3000/api/vehiculos'


  async getAll() {

    return lastValueFrom(
      this.httpClient.get<Vehiculo[]>(this.baseUrl)

    )

  }
  async registerVehiculo(body: Vehiculo, clienteId: number) {
    return lastValueFrom(
      this.httpClient.post<Vehiculo>(`${this.baseUrl}/nuevoVehiculo/${clienteId}`, body)
    )
  }

  async getVehiculo(body: string) {
    return lastValueFrom(
      this.httpClient.post<Vehiculo>(`${this.baseUrl}/vehiculo`, body)
    )
  }

  async getVehiculoById(vehiculoId: number) {
    return lastValueFrom(
      this.httpClient.get<Vehiculo>(`${this.baseUrl}/${vehiculoId}`)
    )
  }


  async getVehiculosByClienteId(clienteId: number) {
    return lastValueFrom(
      this.httpClient.get<Vehiculo[]>(`${this.baseUrl}/vehiculo/${clienteId}`)
    )
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async getVehiculoByReparacion(body: any) {

    return lastValueFrom(
      this.httpClient.post<Vehiculo>(`${this.baseUrl}/reparacion`, body)
    )
  }

}
