import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import type { Reparacion } from '../../interfaces/reparacion';

@Component({
  selector: 'app-detalle-reparacion',
  imports: [],
  templateUrl: './detalle-reparacion.component.html',
  styleUrl: './detalle-reparacion.component.css'
})
export class DetalleReparacionComponent {
  reparacionesServices = inject(ReparacionesService);
  @Input() idReparacion = 0
  reparacion!: Reparacion

  async ngOnInit() {
    await this.getReparacion()
  }

  async getReparacion() {
    //getById  repaciones
    try {
      this.reparacion = await this.reparacionesServices.getByIdReparacion(this.idReparacion)
    } catch (error) {
      console.log(error)
    }
  }

}
