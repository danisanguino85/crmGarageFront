import { Component, inject } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-nueva-reparacion',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nueva-reparacion.component.html',
  styleUrl: './nueva-reparacion.component.css'
})
export class NuevaReparacionComponent {

  reparacionesServices = inject(ReparacionesService);
  router = inject(Router)

  formRegistro: FormGroup = new FormGroup({
    fecha_ingreso: new FormControl('', [
      Validators.required
    ]),
    fecha_salida: new FormControl('', [
      Validators.required
    ]),
    estado: new FormControl('', [
      Validators.required
    ]),
    fecha_finalizacion: new FormControl('', [
      Validators.required
    ]),
    presupuesto: new FormControl('', [
      Validators.required
    ]),
    precio_total: new FormControl('', [
      Validators.required
    ])
  })

  async onSubmit() {
    try {
      if (this.formRegistro.valid) {
        const reparaciones = await this.reparacionesServices.register(this.formRegistro.value);

        toast.success('Reparación registrada correctamente');

        setTimeout(() => {
          this.router.navigateByUrl('/reparaciones');
        }, 1500);
      } else {
        toast.error('Por favor completa correctamente el formulario');
      }
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al registrar la reparación');
    }
  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.formRegistro.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }
}
