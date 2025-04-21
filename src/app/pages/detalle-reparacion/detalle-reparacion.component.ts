import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import type { Reparacion } from '../../interfaces/reparacion';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
import type { Nota } from '../../interfaces/nota';

@Component({
  selector: 'app-detalle-reparacion',
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './detalle-reparacion.component.html',
  styleUrl: './detalle-reparacion.component.css'
})
export class DetalleReparacionComponent {
  reparacionesServices = inject(ReparacionesService);
  notasService = inject(NotasService)
  @Input() reparacionId = 0
  @Output() reloadNotas = new EventEmitter<void>();
  nota: Nota | undefined
  reparacion!: Reparacion
  router = inject(Router)
  activatedRoute = false;
  finalizadoBool: boolean = false;

  async ngOnInit() {
    try {
      this.reparacion = await this.reparacionesServices.getReparacionById(this.reparacionId)

      this.reparacion.estado === 'finalizado'? this.finalizadoBool = true : this.finalizadoBool = false;
    } catch (error) {
    }
  }


  formAddNota: FormGroup = new FormGroup({
    notas: new FormControl()
  })

  async onSubmitNota() {

    try {
      await this.notasService.insertReparacionNota(this.reparacionId, this.formAddNota.value)
      this.formAddNota.reset();
      this.reloadNotas.emit();
    } catch (error) {

    }
  }


 async marcarComoCompletado(){

    const response = await this.reparacionesServices.reparacionCompletada(this.reparacionId = 6, {estado: 'finalizado'});
    this.ngOnInit()
    console.log(response)
  }


  activated() {
    this.activatedRoute = true
  }
  nonActivated() {
    this.activatedRoute = false
  }
}

