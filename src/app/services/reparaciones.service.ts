import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import type { Reparacion } from '../interfaces/reparacion';
import { environment } from '../../environments/enviroment';
import { jwtDecode } from 'jwt-decode';

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

  getReparacionById(idReparacion: number) {

    return lastValueFrom(
      this.httpClient.get<Reparacion>(`${this.baseUrl}/${idReparacion}`)
    )
  }

/* http://localhost:3000/api/reparaciones/usuario */
  getReparacionesByMecanico(){
    return lastValueFrom(
      this.httpClient.get<Reparacion[]>(`${this.baseUrl}/usuario`)
    )
  }

  
}

