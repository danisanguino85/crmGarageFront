import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css'
})
export class NuevoClienteComponent {


  router = inject(Router)
  clientesService = inject(ClientesService)

  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl(),
    apellidos: new FormControl(),
    dni: new FormControl(),
    telefono: new FormControl(),
    email: new FormControl(),
    direccion: new FormControl(),

  })


  async onSubmit() {
    const nuevoCliente = await this.clientesService.register(this.registerForm.value)
    const clienteId = nuevoCliente.id
    this.router.navigate([`/cliente/${clienteId}`])
    this.registerForm.reset()
  }





}
