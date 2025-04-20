import { Component, inject } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-lista-vehiculos',
  imports: [RouterLink, DatePipe],
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

