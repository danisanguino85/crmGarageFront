import { Component, inject } from '@angular/core';
import { ListaReparacionesComponent } from "../lista-reparaciones/lista-reparaciones.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import type { Reparacion } from '../../interfaces/reparacion';
import { ReparacionesService } from '../../services/reparaciones.service';
import { environment } from '../../../environments/enviroment';
import { UsuariosService } from '../../services/usuarios.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-dashboard-mecanico',
  imports: [RouterLink, DatePipe, CurrencyPipe, NgxSonnerToaster],
  templateUrl: './dashboard-mecanico.component.html',
  styleUrl: './dashboard-mecanico.component.css'
})
export class DashboardMecanicoComponent {

  arrRepaciones: Reparacion[] = [];


  reparacionesServices = inject(ReparacionesService);
  usuarioServices = inject(UsuariosService);
  reparacionSeleccionada!: Reparacion
  mecanico!: Usuario
  arrMecanicoReparaciones: Reparacion[] = [];
  router = inject(Router)


  async ngOnInit() {

    try {
      /* A esta funcion no hay pasarle id del usuario porque desde el interceptor va a localstorage, decodifica el token coge el Id del usuario y se le asigna a la funcion en el back, y aqui en el front mediante esta funcion nos devuelve la reparaciones del cliente */
      const mecanicoReparaciones: Reparacion[] = await this.reparacionesServices.getReparacionesByMecanico()
      this.arrMecanicoReparaciones = mecanicoReparaciones

      const data: any = await this.usuarioServices.tokenDecodificado()
      const mecanico = await this.usuarioServices.getById(data?.id);
      this.mecanico = mecanico;

    } catch (error: any) {

      toast.error(error.message)
    }
  }


}
