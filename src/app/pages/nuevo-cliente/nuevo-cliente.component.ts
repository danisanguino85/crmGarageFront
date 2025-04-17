import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Router, RouterLink } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-nuevo-cliente',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css'
})
export class NuevoClienteComponent {


  router = inject(Router)
  clientesService = inject(ClientesService)

  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    apellidos: new FormControl('', [
      Validators.required,

    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9)

    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(12)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    direccion: new FormControl('', [
      Validators.required
    ]),


  })
  checkError(fieldName: string, errorName: string) {
    return this.registerForm.get(fieldName)?.hasError(errorName) && this.registerForm.get(fieldName)?.touched
  }



  async onSubmit() {
    try {
      const nuevoCliente = await this.clientesService.register(this.registerForm.value)


      toast.success('Cliente registrado correctamente')

      setTimeout(() => {
        this.router.navigate([`/admin/cliente/${nuevoCliente.id}`])
      }, 1500)

      this.registerForm.reset()

    } catch (error) {
      toast.error('Hubo un error al registrar al cliente')
    }
  }





}
