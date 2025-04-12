import { Component, inject, Input } from '@angular/core';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-detalle-vehiculo',
  imports: [],
  templateUrl: './detalle-vehiculo.component.html',
  styleUrl: './detalle-vehiculo.component.css'
})
export class DetalleVehiculoComponent {

  vehiculo!: Vehiculo
  vehiculosService = inject(VehiculosService)

  @Input() vehiculoId = 0

  async ngOnInit() {
    await this.loadVehiculo()
  }


  async loadVehiculo() {
    try {
      this.vehiculo = await this.vehiculosService.getVehiculoById(this.vehiculoId)
    } catch (error) {

    }
  }

}
