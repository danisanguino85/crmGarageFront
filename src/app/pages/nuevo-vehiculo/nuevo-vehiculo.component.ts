import { Component, inject, Input } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';



@Component({
  selector: 'app-nuevo-vehiculo',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nuevo-vehiculo.component.html',
  styleUrl: './nuevo-vehiculo.component.css'
})
export class NuevoVehiculoComponent {
  @Input() clienteId = 0
  vehiculosService = inject(VehiculosService)
  activatedRoute = inject(ActivatedRoute)

  nuevoVehiculoForm: FormGroup = new FormGroup({
    matricula: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{4}[a-zA-Z]{3}$/)
    ]),
    bastidor: new FormControl('', [
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(17)
    ]),
    marca: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    modelo: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30)
    ]),
    fecha_matriculacion: new FormControl('', [
      Validators.required,
    ]),

  })

  async onSubmit() {
    if (this.nuevoVehiculoForm.valid) {

      console.log(this.nuevoVehiculoForm.value)
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.activatedRoute.parent!.params.subscribe(async (params: any) => {
        this.clienteId = params.clienteId;
      })

      try {
        await this.vehiculosService.registerVehiculo(this.nuevoVehiculoForm.value, this.clienteId);
        console.log('Vehículo registrado correctamente:', this.nuevoVehiculoForm.value);

        toast.success('Vehiculo registrado correctamente');

      } catch (error) {
        console.error('Error al registrar el vehículo:', error);
        toast.error('Hubo un error al registrar el vehiculo');

      };
      this.nuevoVehiculoForm.reset()
    } else {
      console.log('Formulario inválido');
      toast.error('Hubo un error al registrar el vehiculo');
    }
  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.nuevoVehiculoForm.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }




}

