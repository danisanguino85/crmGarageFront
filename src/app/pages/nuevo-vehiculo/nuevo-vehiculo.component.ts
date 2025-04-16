import { Component, inject } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-vehiculo',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-vehiculo.component.html',
  styleUrl: './nuevo-vehiculo.component.css'
})
export class NuevoVehiculoComponent {

  vehiculosService = inject(VehiculosService)

  nuevoVehiculoForm: FormGroup = new FormGroup({
    matricula: new FormControl(''),
    bastidor: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    fecha_matriculacion: new FormControl(''),
    km: new FormControl(''),

  })

  async onSubmit() {
    await this.vehiculosService.registerVehiculo(this.nuevoVehiculoForm.value)
  }


}

