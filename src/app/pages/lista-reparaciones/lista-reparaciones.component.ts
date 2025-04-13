import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import type { Reparacion } from '../../interfaces/reparacion';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-reparaciones',
  imports: [RouterLink],
  templateUrl: './lista-reparaciones.component.html',
  styleUrl: './lista-reparaciones.component.css'
})
export class ListaReparacionesComponent {


  reparacionesServices = inject(ReparacionesService);
  reparacionSeleccionada!: Reparacion
  reparaciones: Reparacion[] = []
  router = inject(Router)

  async ngOnInit() {


    try {
      this.reparaciones = await this.reparacionesServices.getAllReparaciones()
    } catch (error) {
      console.log(error)
    }
  }


}
