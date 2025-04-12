import { Component, inject, Input } from '@angular/core';
import type { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-detalle-cliente',
  imports: [],
  templateUrl: './detalle-cliente.component.html',
  styleUrl: './detalle-cliente.component.css'
})
export class DetalleClienteComponent {
  @Input() clienteId = 0
  cliente!: Cliente
  clientesService = inject(ClientesService)

  async ngOnInit() {
    await this.getCliente()
  }


  async getCliente() {
    try {
      this.cliente = await this.clientesService.getById(this.clienteId)
      console.log(this.cliente)
    } catch (error) {

    }
  }
}
