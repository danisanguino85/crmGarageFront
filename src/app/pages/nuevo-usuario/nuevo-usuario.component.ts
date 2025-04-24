import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ESPECIALIDADES } from '../../db/db';


@Component({
  selector: 'app-nuevo-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  usuarioService = inject(UsuariosService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  especialidades: string[] = ESPECIALIDADES;
  modo: 'registrar' | 'actualizar' = 'registrar';
  activatedRoute = inject(ActivatedRoute)

  formRegistro: FormGroup = new FormGroup({
    id: new FormControl(null),
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
      Validators.minLength(12),
      Validators.maxLength(12)
    ]),
    rol: new FormControl('', [
      Validators.required,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    ]),
    jornada: new FormControl('', [
      Validators.required
    ]),

    especialidad: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ])
  })


  ngOnInit() {
    const usuario = this.usuarioService.getUsuario();
    if (usuario) {
      this.modo = 'actualizar';
      this.formRegistro.patchValue({
        id: usuario.id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        dni: usuario.dni,
        telefono: usuario.telefono,
        email: usuario.email,
        fecha_nacimiento: usuario.fecha_nacimiento,
        direccion: usuario.direccion,
        numero_ss: usuario.numero_ss,
        rol: usuario.rol,
        password: usuario.password,
        jornada: usuario.jornada,
        especialidad: usuario.especialidad
      });
    } else {
      this.modo = 'registrar';
      this.formRegistro.reset();
    }
  }

  async onSubmit() {
    try {
      const usuarioData = { ...this.formRegistro.value };

      if (usuarioData.fecha_nacimiento) {
        usuarioData.fecha_nacimiento = new Date(usuarioData.fecha_nacimiento)
          .toISOString()
          .split('T')[0];
      }

      if (usuarioData.id) {
        await this.usuarioService.update(usuarioData.id, usuarioData);
        toast.success('Usuario actualizado correctamente');
      } else {
        await this.usuarioService.register(usuarioData);
        toast.success('Usuario registrado correctamente');
      }

      // // biome-ignore lint/style/noNonNullAssertion: <explanation>
      // // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      // this.activatedRoute.parent!.params.subscribe(async (params: any) => {

      //   console.log(params.id)


      // });


      this.formRegistro.reset();
      this.modo = 'registrar';

      setTimeout(() => {
        const rol = usuarioData.rol;
        // this.router.navigate([`/usuario/${usuarioId}`]);
      }, 1500);

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.error.message);
    }
  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.formRegistro.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }
}
