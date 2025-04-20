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

    }

    this.ordenarPorFechaIngreso();
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async filtrarPorEstado($event: any) {

    if ($event.target.value === 'pendiente') {
      this.reparaciones = await this.reparacionesServices.getPendiente()
    } else {
      this.reparaciones = await this.reparacionesServices.getEnProgreso()
    } if ($event.target.value === 'finalizado') {
      this.reparaciones = await this.reparacionesServices.getFinalizado()
    } if ($event.target.value === '') {
      this.reparaciones = await this.reparacionesServices.getAllReparaciones()
    }
    this.ordenarPorFechaIngreso()
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async filtrarPorFecha($event: any) {

    /* ordenar por fecha de mas reciente a mas antigua */
    if ($event.target.value === 'fecha_ingreso') {
      this.reparaciones = await this.reparacionesServices.getFecha()
    } else {
      this.reparaciones = await this.reparacionesServices.getFechaAntigua()
    } if ($event.target.value === '') {
      this.reparaciones = await this.reparacionesServices.getAllReparaciones()
    }
  }

  async loadMecanico() {
    this.usuarios = await this.usuariosService.getAll()
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getEstiloEstado(estado: string): any {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return { color: 'white', backgroundColor: 'red' };
      case 'en_progreso':
        return { color: 'white', backgroundColor: 'orange' };
      case 'finalizado':
        return { color: 'white', backgroundColor: 'green' };
    }
  }

  ordenarPorFechaIngreso() {
    for (let i = 0; i < this.reparaciones.length; i++) {
      this.reparaciones[i].fecha_ingreso = new Date(this.reparaciones[i].fecha_ingreso)
    }
    this.reparaciones.sort((a, b) => a.fecha_ingreso.getTime() - b.fecha_ingreso.getTime());
  }
}



