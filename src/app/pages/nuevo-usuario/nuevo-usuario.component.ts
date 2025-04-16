import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { ESPECIALIDADES } from '../../db/db';


@Component({
  selector: 'app-nuevo-usuario',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  usuarioService = inject(UsuariosService);
  router = inject(Router);
  especialidades: string[] = ESPECIALIDADES

  formRegistro: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}[A-HJ-NP-TV-Z]$/i)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\+34|0034|34)?[6-7][0-9]{8}$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    fecha_nacimiento: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    numero_ss: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{12}$/)
    ]),
    rol: new FormControl('', [
      Validators.required,
    ]),
    activo: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    ]),
    jornada: new FormControl('', [
      Validators.required,
    ]),
    foto_perfil: new FormControl('', [
      Validators.pattern(/https?:\/\/.+/)
    ]),
    especialidad: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ])
  })

  async onSubmit() {
    try {
      const usuario = await this.usuarioService.register(this.formRegistro.value);

      toast.success('Usuario registrado correctamente');

      setTimeout(() => {
        if (usuario.rol === 'admin') {
          this.router.navigateByUrl('/admin');
        } else if (usuario.rol === 'mecanico') {
          this.router.navigateByUrl('/taller');
        }
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al registrar el usuario');
    }
  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.formRegistro.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }

}
