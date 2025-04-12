import { Component, inject } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import type { Vehiculo } from '../../interfaces/vehiculo';

@Component({
  selector: 'app-lista-vehiculos',
  imports: [],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})
export class ListaVehiculosComponent {

  vehiculos: Vehiculo[] = []
  vehiculosService = inject(VehiculosService)



  async ngOnInit() {
    await this.loadVehiculos()
  }

  async loadVehiculos() {
    try {
      this.vehiculos = await this.vehiculosService.getAll()
    } catch (error) {

    }
  }

}
