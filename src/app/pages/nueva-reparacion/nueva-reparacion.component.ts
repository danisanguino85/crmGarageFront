import { Component, inject } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nueva-reparacion',
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-reparacion.component.html',
  styleUrl: './nueva-reparacion.component.css'
})
export class NuevaReparacionComponent {

  reparacionesServices = inject(ReparacionesService);
  router = inject(Router)

  formRegistro: FormGroup = new FormGroup({
    fecha_ingreso: new FormControl(),
    fecha_salida: new FormControl(),
    estado: new FormControl(),
    fecha_finalizacion: new FormControl(),
    presupuesto: new FormControl(),
    precio_total: new FormControl()
  })

  async onSubmit() {
    try {
      const reparaciones = await this.reparacionesServices.register(this.formRegistro.value)
      this.router.navigateByUrl('/reparaciones');
    } catch (error) {
      console.log(error)
    }
  }
}
