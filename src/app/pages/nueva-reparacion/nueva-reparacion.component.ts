import { Component, inject } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-nueva-reparacion',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nueva-reparacion.component.html',
  styleUrl: './nueva-reparacion.component.css'
})
export class NuevaReparacionComponent {
  usuariosService = inject(UsuariosService)
  reparacionesServices = inject(ReparacionesService);
  router = inject(Router)
  mecanicos: Usuario[] = []



  formRegistro: FormGroup = new FormGroup({

    presupuesto: new FormControl('', [
      Validators.required
    ]),
    precio_total: new FormControl('', [
      Validators.required
    ])
  })

  async ngOnInit() {
    await this.loadMecanicos()
  }

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


  async loadMecanicos() {
    try {
      const usuarios = await this.usuariosService.getAll()

      this.mecanicos = usuarios.filter((usuario) => usuario.rol === 'mecanico');
    } catch (error) {

    }

  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.formRegistro.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }
}
