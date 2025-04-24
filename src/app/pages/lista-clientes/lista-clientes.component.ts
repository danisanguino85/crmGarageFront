import { Component, inject } from '@angular/core';
import type { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { RouterLink } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-lista-clientes',
  imports: [RouterLink, NgxSonnerToaster],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css'
})
export class ListaClientesComponent {

  clientes: Cliente[] = []
  clientesService = inject(ClientesService)
  paginaActual = 0
  limitePorPagina = 10

  async ngOnInit() {
    this.cargarClientes()
  }


  async cargarClientes() {
    try {
      const desde = this.paginaActual * this.limitePorPagina;
      this.clientes = await this.clientesService.getAll(desde, this.limitePorPagina);
    } catch (error) {
      console.error("Error al cargar los clientes:", error);
    }
  }

  siguientePagina() {
    if (this.paginaActual < 2) {
      this.paginaActual++;
      this.cargarClientes();
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarClientes();
    }
  }
}




