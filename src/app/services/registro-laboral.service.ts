import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Cliente } from '../interfaces/cliente';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroLaboralService {

  private httpClient = inject(HttpClient)
  private baseUrl = 'http://localhost:3000/api/registro'
  private registroLaboral: Cliente | null = null;



  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  insertEntrada(body: any) {
    return lastValueFrom(
      this.httpClient.post(`${this.baseUrl}/entrada`, body)
    )
  }


  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  inserSalida(body: any) {
    return lastValueFrom(
      this.httpClient.post(`${this.baseUrl}/salida`, body)
    )
  }


  getLatestEntradas(usuarioId: number) {
    return lastValueFrom(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.httpClient.get<any>(`${this.baseUrl}/entradas/${usuarioId}`)
    )
  }
  getLatestSalidas(usuarioId: number) {
    return lastValueFrom(
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.httpClient.get<any>(`${this.baseUrl}/salidas/${usuarioId}`)
    )
  }

}
