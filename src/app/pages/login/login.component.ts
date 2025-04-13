import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioService = inject(UsuariosService);
  router = inject(Router);

  formLogin: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  async onSubmit() {
    try {
      const response = await this.usuarioService.login(this.formLogin.value)
      localStorage.setItem('crm_garage_token', response.token)
      this.router.navigateByUrl('/');
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}
