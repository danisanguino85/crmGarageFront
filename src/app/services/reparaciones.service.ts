import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Reparacion } from '../interfaces/reparacion';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {
 
  httpClient = inject(HttpClient);
  baseUrl: string = 'http://localhost:3000/api/reparaciones'


  getAllReparaciones(){
    return lastValueFrom(
      this.httpClient.get<Reparacion[]>(this.baseUrl)
    )
  }

  getByIdReparaciones(idReparaciones: string){
    return lastValueFrom(
      this.httpClient.get<Reparacion>(`${this.baseUrl}/${idReparaciones}`)
    )
  }

}

