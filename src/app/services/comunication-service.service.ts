import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationServiceService {

  private eventoSubject = new Subject<boolean>();
  evento$ = this.eventoSubject.asObservable();

  emitirActivacion(valor: boolean) {
    this.eventoSubject.next(valor);
  }

}
