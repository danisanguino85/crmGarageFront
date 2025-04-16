import { Component, inject, Input } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    matricula: new FormControl(''),
    bastidor: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    fecha_matriculacion: new FormControl(''),
    km: new FormControl(''),

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




}

