import { Component, inject, Input } from '@angular/core';
import type { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { NotasService } from '../../services/notas.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Nota } from '../../interfaces/nota';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ReparacionesService } from '../../services/reparaciones.service';
import { DatePipe } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-detalle-cliente',
  imports: [ReactiveFormsModule, DatePipe, RouterLink, RouterOutlet],
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
  notasService = inject(NotasService)
  vehiculosService = inject(VehiculosService)
  activatedRoute = inject(ActivatedRoute)
  reparacionId = 0
  mecanicoAdmin?: boolean = false
  vehiculos: Vehiculo[] = []

  nuevaNotaForm: FormGroup = new FormGroup({
    notas: new FormControl()
  })

  async ngOnInit() {
    this.loadCliente()
    this.loadVehiculo()
    const data = this.usuarioService.tokenDecodificado()
    if (data?.rol === 'mecanico') {
      this.mecanicoAdmin = true;
    };
  }

  async loadVehiculo() {
    try {
      this.vehiculos = await this.vehiculosService.getVehiculosByClienteId(this.clienteId)
      console.log(this.vehiculos)
    } catch (error) {

    }
  }


  async loadCliente() {
    try {
      this.cliente = await this.clientesService.getById(this.clienteId)

    } catch (error) {

    }
  }
}
