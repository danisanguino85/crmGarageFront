import { Component, inject, Input } from '@angular/core';
import { NotasService } from '../../services/notas.service';
import { ActivatedRoute, Router } from '@angular/router';
import type { Nota } from '../../interfaces/nota';
import { DatePipe } from '@angular/common';
import { ComunicationServiceService } from '../../services/comunication-service.service';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-lista-notas',
  imports: [DatePipe, NgxSonnerToaster],
  templateUrl: './lista-notas.component.html',
  styleUrl: './lista-notas.component.css'
})
export class ListaNotasComponent {
  notasService = inject(NotasService);
  activatedRoute = inject(ActivatedRoute);
  arrReparacionNotas: Nota[] = [];
  @Input() notaId = 0;
  router = inject(Router)
  comunicacionService = inject(ComunicationServiceService);

  ngOnInit() {
    try {

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.activatedRoute.parent!.params.subscribe(async (params: any) => {

        const reparacionNotas = await this.notasService.getReparacionAllNotas(params.reparacionId)
        this.arrReparacionNotas = reparacionNotas;

        /* esta funcion recibe lo que hace es que cuando añadamos una nota desde el panel de reparacion del meacnico
        este recibe recibe evento y llama a ng on init para refrescar la lista de notas
         */
        this.comunicacionService.evento$.subscribe(valor => {
          if (valor === true) {
            this.ngOnInit()
          }
        });
      });
    } catch (error: any) {
      toast.error(error.message)
    }

  }


}
