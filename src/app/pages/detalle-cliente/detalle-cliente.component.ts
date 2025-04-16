import { Component, inject, Input } from '@angular/core';
import type { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { NotasService } from '../../services/notas.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Nota } from '../../interfaces/nota';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ReparacionesService } from '../../services/reparaciones.service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/enviroment';
import { UsuariosService } from '../../services/usuarios.service';

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
  activatedRoute = inject(ActivatedRoute)
  reparacionId = 0
  mecanicoAdmin?: boolean = false


  nuevaNotaForm: FormGroup = new FormGroup({
    notas: new FormControl()
  })

  async ngOnInit() {
    this.loadCliente()
    const data = this.usuarioService.tokenDecodificado()
    if (data?.rol === 'mecanico') {
      this.mecanicoAdmin = true;
    };


  }


  async loadCliente() {
    try {
      this.cliente = await this.clientesService.getById(this.clienteId)

    } catch (error) {

    }
  }
}
