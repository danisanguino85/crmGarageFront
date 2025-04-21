import { Component, inject, Input } from '@angular/core';
import type { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { NotasService } from '../../services/notas.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Nota } from '../../interfaces/nota';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ReparacionesService } from '../../services/reparaciones.service';
import { DatePipe } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';
import type { Reparacion } from '../../interfaces/reparacion';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

type Body = {
  vehiculoId: 0
}


@Component({
  selector: 'app-detalle-cliente',
  imports: [ReactiveFormsModule, DatePipe, RouterLink, RouterOutlet, NgxSonnerToaster],
  templateUrl: './detalle-cliente.component.html',
  styleUrl: './detalle-cliente.component.css'
})
export class DetalleClienteComponent {
  @Input() clienteId = 0

  cliente!: Cliente
  nota!: Nota
  notas: Nota[] = []
  clientesService = inject(ClientesService);
  reparacionesService = inject(ReparacionesService);
  usuarioService = inject(UsuariosService)
  route = inject(ActivatedRoute);
  notasService = inject(NotasService)
  vehiculosService = inject(VehiculosService)
  activatedRoute = inject(ActivatedRoute)
  reparacionId = 0
  mecanicoAdmin?: boolean = false
  vehiculos: Vehiculo[] = []
  reparaciones: Reparacion[] = []
  coche!: Vehiculo
  router = inject(Router);
  clienteReparacion!: Cliente

  nuevaNotaForm: FormGroup = new FormGroup({
    notas: new FormControl()
  });

  ngOnInit() {
    try {
      this.loadCliente()
      this.loadVehiculos()
      const data = this.usuarioService.tokenDecodificado()
      if (data?.rol === 'mecanico') {
        this.mecanicoAdmin = true;
      };
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async loadVehiculos() {
    try {
      this.vehiculos = await this.vehiculosService.getVehiculosByClienteId(this.clienteId)

      this.activatedRoute.parent!.params.subscribe(async (params: any) => {
        this.clienteReparacion = await this.clientesService.getClienteByReparacion(params.reparacionId)
      });
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  async onClick(vehiculoId: number) {

    try {
      this.reparaciones = await this.reparacionesService.getReparacionesByVehiculo({ vehiculoId })
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  async loadCliente() {
    try {
      this.cliente = await this.clientesService.getById(this.clienteId);
    } catch (error: any) {
      toast.error(error.message)
    }
  }


}

