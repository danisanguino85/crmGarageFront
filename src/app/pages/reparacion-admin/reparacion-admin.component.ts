import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import type { Reparacion } from '../../interfaces/reparacion';
import { ClientesService } from '../../services/clientes.service';
import type { Cliente } from '../../interfaces/cliente';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { NotasService } from '../../services/notas.service';
import type { Nota } from '../../interfaces/nota';
import { UsuariosService } from '../../services/usuarios.service';
import type { Usuario } from '../../interfaces/usuario';
import { NgxSonnerToaster, toast } from 'ngx-sonner';



@Component({
  selector: 'app-reparacion-admin',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './reparacion-admin.component.html',
  styleUrl: './reparacion-admin.component.css'
})
export class ReparacionAdminComponent {
  reparacion!: Reparacion
  reparacionesService = inject(ReparacionesService)
  clientesService = inject(ClientesService)
  vehiculosService = inject(VehiculosService)
  notasService = inject(NotasService)
  usuariosService = inject(UsuariosService)
  cliente!: Cliente
  vehiculo!: Vehiculo
  mecanico!: Usuario
  notas: Nota[] = []
  nota!: Nota
  @Input() reparacionId = 0


  async ngOnInit() {

    try {
      this.getCliente()
      this.loadReparacion()
      this.loadVehiculo()
      this.loadNotas()
      this.loadMecanico()
    } catch (error: any) {
      toast.error(error.error.message);
    }
  }

  async loadReparacion() {
    try {
      this.reparacion = await this.reparacionesService.getReparacionById(this.reparacionId)

    } catch (error: any) {
      toast.error(error.error.message);
    }

  }
  async getCliente() {
    try {
      this.cliente = await this.clientesService.getClienteByReparacion(this.reparacionId)
    } catch (error: any) {
      toast.error(error.error.message);
    }

  }

  async loadVehiculo() {
    try {
      this.vehiculo = await this.vehiculosService.getVehiculoByReparacion(
        {
          id: this.reparacionId
        }
      )
    } catch (error: any) {
      toast.error(error.error.message);
    }
  }

  async loadNotas() {
    try {
      this.notas = await this.notasService.getReparacionAllNotas(this.reparacionId)
    } catch (error: any) {
      toast.error(error.error.message);
    }
  }
  async loadMecanico() {
    try {

      this.mecanico = await this.usuariosService.getMecanicoByReparacion(this.reparacionId)
    } catch (error: any) {
      toast.error(error.error.message);
    }

  }
  async loadNota(notaId: number) {
    try {
      this.nota = await this.notasService.getNotaById(notaId)
    } catch (error: any) {
      toast.error(error.error.message);
    }
  }



}