import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { VehiculosService } from '../../services/vehiculos.service';
import type { Vehiculo } from '../../interfaces/vehiculo';

@Component({
  selector: 'app-nueva-reparacion',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nueva-reparacion.component.html',
  styleUrl: './nueva-reparacion.component.css'
})
export class NuevaReparacionComponent {
  usuariosService = inject(UsuariosService)
  reparacionesServices = inject(ReparacionesService);
  vehiculosService = inject(VehiculosService)
  router = inject(Router)
  mecanicos: Usuario[] = []
  vehiculos: Vehiculo[] = []
  route = inject(ActivatedRoute)
  clienteId!: number
  activatedRoute = inject(ActivatedRoute);

  formRegistro: FormGroup = new FormGroup({
    vehiculos_id: new FormControl('', [
      Validators.required
    ]),
    comentarios: new FormControl('', [
      Validators.required
    ]),
    presupuesto: new FormControl('', [
      Validators.required
    ]),
    usuarios_id: new FormControl('', [
      Validators.required
    ])
  })

  async ngOnInit() {
    await this.loadMecanicos()
    await this.loadVehiculos()
  }

  async onSubmit() {
    try {
      if (this.formRegistro.valid) {
        await this.reparacionesServices.register(this.formRegistro.value);
        console.log(this.formRegistro.value)
        toast.success('Reparación registrada correctamente');
      } else {
        toast.error('Por favor completa correctamente el formulario');
      }
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al registrar la reparación');
    }
  }

  async loadMecanicos() {
    try {
      const usuarios = await this.usuariosService.getAll()

      this.mecanicos = usuarios.filter((usuario) => usuario.rol === 'mecanico');
    } catch (error) {

    }

  }

  async loadVehiculos() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {
      this.clienteId = params.clienteId
      this.vehiculos = await this.vehiculosService.getVehiculosByClienteId(this.clienteId)
    });


  }

  //checkControl(controlName: string, errorName: string): boolean {
  //const control = this.formRegistro.get(controlName);
  //return !!control && control.hasError(errorName) && control.touched;
  //}
}
