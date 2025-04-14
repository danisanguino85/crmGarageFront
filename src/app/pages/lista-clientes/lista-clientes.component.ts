import { Component, inject } from '@angular/core';
import type { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  imports: [RouterLink],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css'
})
export class ListaClientesComponent {

  clientes: Cliente[] = []
  clientesService = inject(ClientesService)

  async ngOnInit() {
    await this.getClientes()
  }

  async getClientes() {
    try {
      this.clientes = await this.clientesService.getAll()
      console.log(this.clientes)
    } catch (error) {
      console.log(error)
    }
  }

}
