import { Component, inject } from '@angular/core';
import { ListaReparacionesComponent } from "../lista-reparaciones/lista-reparaciones.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Reparacion } from '../../interfaces/reparacion';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-dashboard-mecanico',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-mecanico.component.html',
  styleUrl: './dashboard-mecanico.component.css'
})
export class DashboardMecanicoComponent {

  arrRepaciones: Reparacion[]=[];

  
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
