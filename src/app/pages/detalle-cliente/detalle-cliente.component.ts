import { Component, inject, Input } from '@angular/core';
import type { Cliente } from '../../interfaces/cliente';
import { ClientesService } from '../../services/clientes.service';
import { NotasService } from '../../services/notas.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Nota } from '../../interfaces/nota';
import { ActivatedRoute } from '@angular/router';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-detalle-cliente',
  imports: [ReactiveFormsModule],
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
  notasService = inject(NotasService)
  activatedRoute = inject(ActivatedRoute)
  reparacionId: number = 0


  nuevaNotaForm: FormGroup = new FormGroup({
    notas: new FormControl()
  })

  async ngOnInit() {

    this.activatedRoute.params.subscribe((params:any)  => {
      console.log(params)
    });

    /* const cliente = await this.clientesService.getAll()
    const reparaciones = await this.reparacionesService.getAllReparaciones();
    console.log(reparaciones)
    console.log(this.reparacionId) */

   /*  console.log(this.reparacionId) */
/* 
    const reparacion =  reparaciones.find(reparacion => reparacion.id === this.reparacionId) */

     
    await this.loadCliente()
    await this.loadNotas()


  }
  async loadCliente() {
    try {
      this.cliente = await this.clientesService.getById(this.clienteId)

    } catch (error) {

    }
  }

  async onSubmitNota() {

    try {
      this.nota = await this.notasService.create(this.nuevaNotaForm.value)
      this.nuevaNotaForm.reset()
    } catch (error) {

    }

  }
  async loadNotas() {

    try {
      this.notas = await this.notasService.getAllNotas()
    } catch (error) {

    }
  }
}
