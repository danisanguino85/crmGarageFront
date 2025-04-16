import { Component, inject, Input } from '@angular/core';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';
import { ActivatedRoute } from '@angular/router';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-detalle-vehiculo',
  imports: [],
  templateUrl: './detalle-vehiculo.component.html',
  styleUrl: './detalle-vehiculo.component.css'
})
export class DetalleVehiculoComponent {

  vehiculo: Vehiculo | undefined
  vehiculosService = inject(VehiculosService)
  reparacionesService = inject(ReparacionesService);
  activatedRoute = inject(ActivatedRoute);


  @Input() vehiculoId = 0


  async ngOnInit() {

    this.activatedRoute.parent!.params.subscribe(async (params: any) => {
      const body = {
        id: params.reparacionId
      }
      this.vehiculo = await this.vehiculosService.getVehiculoByReparacion(body)
    });

    //await this.loadVehiculo()
  }


  async loadVehiculo() {
    try {
      this.vehiculo = await this.vehiculosService.getVehiculoById(this.vehiculoId)
    } catch (error) {

    }
  }

}
