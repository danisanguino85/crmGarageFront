import { Component, inject } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import type { Reparacion } from '../../interfaces/reparacion';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import type { Usuario } from '../../interfaces/usuario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-reparaciones',
  imports: [RouterLink, DatePipe],
  templateUrl: './lista-reparaciones.component.html',
  styleUrl: './lista-reparaciones.component.css'
})
export class ListaReparacionesComponent {

  usuariosService = inject(UsuariosService)
  reparacionesServices = inject(ReparacionesService);
  reparacionSeleccionada!: Reparacion
  usuarios!: Usuario[]
  reparaciones: Reparacion[] = []
  router = inject(Router)

  async ngOnInit() {
    try {
      this.reparaciones = await this.reparacionesServices.getAllReparaciones()
      await this.loadMecanico()
    } catch (error) {
      console.log(error)
    }
  }

  async loadMecanico() {
    this.usuarios = await this.usuariosService.getAll()
  }
}



