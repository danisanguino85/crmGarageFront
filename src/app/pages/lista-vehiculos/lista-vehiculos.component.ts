import { Component, inject } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSonnerToaster, toast } from 'ngx-sonner';


@Component({
  selector: 'app-lista-vehiculos',
  imports: [RouterLink, DatePipe, NgxSonnerToaster],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})
export class ListaVehiculosComponent {

  vehiculos: Vehiculo[] = []
  vehiculosService = inject(VehiculosService)



  async ngOnInit() {
    try {
      await this.loadVehiculos()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async loadVehiculos() {
    try {
      this.vehiculos = await this.vehiculosService.getAll()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

}

