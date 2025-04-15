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
  /* reparaciones: Reparacion[] = []; */
  mecanicoReparaciones: Reparacion[]=[];
  router = inject(Router)

  async ngOnInit() {


/* falta por sacar del local el storage el token, decoficarlo el pasarle el id de mecanico o usuario para que bussque sis  reparaciones */
    try {
      const mecanicoReparaciones = await this.reparacionesServices.getReparacionesByMecanico()
      /* this.mecanicoReparaciones = mecanicoReparaciones; */
    } catch (error) {
      
    }
  }

  
}
