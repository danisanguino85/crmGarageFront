import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';


@Component({
  selector: 'app-nuevo-usuario',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  usuarioService = inject(UsuariosService);
  router = inject(Router);

  formRegistro: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    dni: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    numero_ss: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    activo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]),
    jornada: new FormControl('', [Validators.required]),
    foto_perfil: new FormControl('', Validators.pattern(/https?:\/\/.+/)),
    especialidad: new FormControl('', [Validators.required])
  })

  async onSubmit() {
    try {
      const usuario = await this.usuarioService.register(this.formRegistro.value)
      if (usuario.rol === 'admin') {
        this.router.navigateByUrl('/admin');
      }
      if (usuario.rol === 'mecanico') {
        this.router.navigateByUrl('/taller');
      }
      if (this.formRegistro.valid) {
        toast.success('Usuario registrado correctamente')
      }

    } catch (error) {
      console.error(error)
    }
  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.formRegistro.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }

}
