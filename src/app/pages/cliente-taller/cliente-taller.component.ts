import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-taller',
  imports: [DatePipe],
  templateUrl: './cliente-taller.component.html',
  styleUrl: './cliente-taller.component.css'
})
export class ClienteTallerComponent {
  activatedRoute = inject(ActivatedRoute)
  clienteReparacion!: Cliente | null;
  clientesService = inject(ClientesService);


  ngOnInit() {
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {
      this.clienteReparacion = await this.clientesService.getClienteByReparacion(params.reparacionId)
    });
  }


}



