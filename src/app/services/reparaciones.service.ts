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

  register(body: Reparacion) {
    return lastValueFrom
      (this.httpClient.post<Reparacion>(`${this.baseUrl}/new`, body))
  }

  getByIdReparaciones(idReparaciones: number) {
    return lastValueFrom(
      this.httpClient.get<Reparacion>(`${this.baseUrl}/${idReparaciones}`)
    )
  }

}

