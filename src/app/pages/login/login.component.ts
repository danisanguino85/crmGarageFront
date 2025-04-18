import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { environment } from '../../../environments/enviroment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioService = inject(UsuariosService);
  router = inject(Router);
  loginTime = ''


  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  async onSubmit() {
    this.horaRegistro()
    try {
      const response = await this.usuarioService.login(this.formLogin.value)
      toast.success('Usuario logado correctamente')

      localStorage.setItem(environment.tokenName, response.token)

      const isAdmin = this.usuarioService.isAdmin()


      setTimeout(() => {
        if (isAdmin) {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/taller');
        }
      }, 1500)
    } catch (error) {
      console.log(error)
      toast.error('Error al iniciar sesión',
        {
          description: 'Por favor, verifica tu email y contraseña.'
        }
      )
    }
  }


  horaRegistro() {
    const loginTime = new Date
    this.loginTime = loginTime.toLocaleString().substring(11)
    localStorage.setItem('horaRegistro', this.loginTime)

  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.formLogin.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }
}
