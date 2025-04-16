import { Component, inject, Input } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nuevo-vehiculo',
  imports: [ReactiveFormsModule],
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
      Validators.pattern(/^[0-9]{4}[A-Z]{3}$/)
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
    km: new FormControl('', [
      Validators.required,
      Validators.max(1000000),
    ]),

  })



  async onSubmit() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {

      this.clienteId = params.clienteId
      console.log(this.clienteId)
      await this.vehiculosService.registerVehiculo(this.nuevoVehiculoForm.value, this.clienteId)
      console.log(this.nuevoVehiculoForm.value)
    });
  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.nuevoVehiculoForm.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }




}

