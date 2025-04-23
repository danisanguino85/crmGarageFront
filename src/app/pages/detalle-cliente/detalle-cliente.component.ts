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
import { ComunicationServiceService } from '../../services/comunication-service.service';

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
  clienteReparacion!: Cliente | null;
  comunicacionService = inject(ComunicationServiceService)



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


      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  /* esta funcion lo que hace es recargar la lista de vehiculos asiganadas al usuario */
  ngAfterViewChecked() {
    this.comunicacionService.evento$.subscribe(valor => {
      if (valor === true) {
        this.loadVehiculos()
      }
    });
  }

  async loadVehiculos() {
    try {
      this.vehiculos = await this.vehiculosService.getVehiculosByClienteId(this.clienteId)

      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.activatedRoute.parent!.params.subscribe(async (params: any) => {
        this.clienteReparacion = await this.clientesService.getClienteByReparacion(params.reparacionId)
      });
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.message)
    }

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {
      this.clienteReparacion = await this.clientesService.getClienteByReparacion(params.reparacionId)
    });
  }


  async onClick(vehiculoId: number) {

    try {
      this.reparaciones = await this.reparacionesService.getReparacionesByVehiculo({ vehiculoId })
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  async loadCliente() {
    try {
      this.cliente = await this.clientesService.getById(this.clienteId);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.message)
    }
  }


}

