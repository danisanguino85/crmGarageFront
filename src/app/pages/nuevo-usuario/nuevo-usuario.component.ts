import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  usuarioService = inject(UsuariosService);
  router = inject(Router);

  formRegistro: FormGroup = new FormGroup({
    nombre: new FormControl(),
    apellidos: new FormControl(),
    dni: new FormControl(),
    telefono: new FormControl(),
    email: new FormControl(),
    fecha_nacimiento: new FormControl(),
    direccion: new FormControl(),
    numero_ss: new FormControl(),
    rol: new FormControl(),
    activo: new FormControl(),
    password: new FormControl(),
    jornada: new FormControl(),
    foto_perfil: new FormControl(),
    especialidad: new FormControl()
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

    } catch (error) {
      console.error(error)
    }
  }

}
