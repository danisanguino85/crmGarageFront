import { Component, inject } from '@angular/core';
import { ListaReparacionesComponent } from "../lista-reparaciones/lista-reparaciones.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import type { Reparacion } from '../../interfaces/reparacion';
import { ReparacionesService } from '../../services/reparaciones.service';
import { environment } from '../../../environments/enviroment';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-dashboard-mecanico',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-mecanico.component.html',
  styleUrl: './dashboard-mecanico.component.css'
})
export class DashboardMecanicoComponent {

  arrRepaciones: Reparacion[] = [];


  reparacionesServices = inject(ReparacionesService);
  usuarioServices = inject(UsuariosService);
  reparacionSeleccionada!: Reparacion
  /* reparaciones: Reparacion[] = []; */
  arrMecanicoReparaciones: Reparacion[] = [];
  router = inject(Router)


  async ngOnInit() {

    try {
      /* A esta funcion no hay pasarle id del usuario porque desde el interceptor va a localstorage, decodifica el token coge el Id del usuario y se le asigna a la funcion en el back, y aqui en el front mediante esta funcion nos devuelve la reparaciones del cliente */
      const mecanicoReparaciones: Reparacion[] = await this.reparacionesServices.getReparacionesByMecanico()
      this.arrMecanicoReparaciones = mecanicoReparaciones
    } catch (error) {

    }
  }


}
