import { Component, inject } from '@angular/core';
import { NotasService } from '../../services/notas.service';
import { ActivatedRoute } from '@angular/router';
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

  ngOnInit() {

    this.activatedRoute.parent!.params.subscribe(async (params: any) => {

      const reparacionNotas = await this.notasService.getReparacionAllNotas(params.reparacionId)

      this.arrReparacionNotas = reparacionNotas;
    });


  }

  /* con el primer query recupero las notas en por el id de la reparacacion, pero no se como se insertar la nota y asignarle el id de la reparacion 

SELECT notas.* FROM crm_garage.notas 
join reparaciones on reparaciones.id = notas.reparaciones_id
where reparaciones.id=1;


insert into crm_garage.notas
*/
}
