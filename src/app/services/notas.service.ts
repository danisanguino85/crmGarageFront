import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Nota } from '../interfaces/nota';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:3000/api/notas'

  create(body: Nota) {

    return lastValueFrom(
      this.httpClient.post<Nota>(this.baseUrl, body)
    )
  }
  getAllNotas() {
    return lastValueFrom(
      this.httpClient.get<Nota[]>(this.baseUrl))
  }


  getReparacionAllNotas(reparacionId: number){
    return lastValueFrom(
      this.httpClient.get<Nota[]>(`${this.baseUrl}/nota/${reparacionId}`))
  }
}

