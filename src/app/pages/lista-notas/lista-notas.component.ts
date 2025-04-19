import { Component, inject, Input } from '@angular/core';
import { NotasService } from '../../services/notas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Nota } from '../../interfaces/nota';

@Component({
  selector: 'app-lista-notas',
  imports: [],
  templateUrl: './lista-notas.component.html',
  styleUrl: './lista-notas.component.css'
})
export class ListaNotasComponent {
  notasService = inject(NotasService);
  activatedRoute = inject(ActivatedRoute);
  arrReparacionNotas: Nota[] = [];
  @Input() notaId = 0;
  router = inject(Router)

  ngOnInit() {

    this.activatedRoute.parent!.params.subscribe(async (params: any) => {

      const reparacionNotas = await this.notasService.getReparacionAllNotas(params.reparacionId)
      this.arrReparacionNotas = reparacionNotas;

    });
  }

}
