import { Component, inject, Input } from '@angular/core';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';
import { ActivatedRoute } from '@angular/router';
import { ReparacionesService } from '../../services/reparaciones.service';
import { DatePipe } from '@angular/common';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-detalle-vehiculo',
  imports: [DatePipe, NgxSonnerToaster],
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

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
 /*    try {
      this.activatedRoute.parent!.params.subscribe(async (params: any) => {
        const body = {
          id: params.reparacionId
        }
        this.vehiculon = await this.vehiculosService.getVehiculoByReparacion(body)
      });

       
    } catch (error: any) {
      toast.error(error.message)
    } */
      await this.loadVehiculo() 
  }


  async loadVehiculo() {
    try {
      this.vehiculo = await this.vehiculosService.getVehiculoById(this.vehiculoId)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

}
