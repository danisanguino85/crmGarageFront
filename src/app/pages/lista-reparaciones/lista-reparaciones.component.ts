import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import type { Reparacion } from '../../interfaces/reparacion';

@Component({
  selector: 'app-lista-reparaciones',
  imports: [],
  templateUrl: './lista-reparaciones.component.html',
  styleUrl: './lista-reparaciones.component.css'
})
export class ListaReparacionesComponent {


  reparacionesServices = inject(ReparacionesService);
  reparaciones: Reparacion[] = []


  async ngOnInit() {
    //get all reparaciones
    try {
      this.reparaciones = await this.reparacionesServices.getAllReparaciones()
      console.log(this.reparaciones)
    } catch (error) {
      console.log(error)
    }
  }
}
