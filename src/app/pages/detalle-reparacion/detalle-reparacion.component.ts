import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import type { Reparacion } from '../../interfaces/reparacion';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
import type { Nota } from '../../interfaces/nota';
import { DatePipe } from '@angular/common';
import { ComunicationServiceService } from '../../services/comunication-service.service';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-detalle-reparacion',
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, DatePipe, NgxSonnerToaster],
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
 comunicacionService = inject (ComunicationServiceService)


  async ngOnInit() {
    try {
    
      this.reparacion = await this.reparacionesServices.getReparacionById(this.reparacionId)
    } catch (error: any) {
      toast.error(error.message)
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
    } catch (error: any) {
      toast.error(error.message)
    }
    
    this.comunicacionService.emitirActivacion(true);
  }


  async cambiarEstado(nuevoEstado: string) {

   try {
     const response = await this.reparacionesServices.reparacionCompletada(this.reparacionId, { estado: nuevoEstado });
     this.ngOnInit();
   } catch (error: any) {
    toast.error(error.message)
   }
  }
}

