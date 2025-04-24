import { Component, inject, Input } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ComunicationServiceService } from '../../services/comunication-service.service';



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
  comunicacionService = inject(ComunicationServiceService);


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

    try {

      if (this.nuevoVehiculoForm.valid) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        this.activatedRoute.parent!.params.subscribe(async (params: any) => {
          this.clienteId = params.clienteId;
        })

        await this.vehiculosService.registerVehiculo(this.nuevoVehiculoForm.value, this.clienteId)
        toast.success('Vehiculo registrado correctamente');

        this.nuevoVehiculoForm.reset()
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.error.message);
    }
  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.nuevoVehiculoForm.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }



  actualizarVehiculosAsociados() {
    this.comunicacionService.activarVehiculosAsociados(true);
  }




}

