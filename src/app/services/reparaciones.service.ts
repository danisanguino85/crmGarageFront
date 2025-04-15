import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import type { Reparacion } from '../interfaces/reparacion';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {

  httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/reparaciones'


  getAllReparaciones() {
    return lastValueFrom(
      this.httpClient.get<Reparacion[]>(this.baseUrl)
    )
  }

  getFinalizado() {
    return lastValueFrom
      (this.httpClient.get<Reparacion[]>(`${this.baseUrl}/finalizado`))
  }

  getEnProgreso() {
    return lastValueFrom
      (this.httpClient.get<Reparacion[]>(`${this.baseUrl}/progreso`))
  }

  getPendiente() {
    return lastValueFrom
      (this.httpClient.get<Reparacion[]>(`${this.baseUrl}/pendiente`))
  }

  register(body: Reparacion) {
    return lastValueFrom
      (this.httpClient.post<Reparacion>(`${this.baseUrl}/new`, body))
  }

  getReparacionById(idReparacion: number) {

    return lastValueFrom(
      this.httpClient.get<Reparacion>(`${this.baseUrl}/${idReparacion}`)
    )
  }

  /* http://localhost:3000/api/reparaciones/usuario */
  getReparacionesByMecanico() {
    return lastValueFrom(
      this.httpClient.get<Reparacion[]>(`${this.baseUrl}/usuario`)
    )
  }


}

