import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { MailingService } from '../../services/mailing.service';
import type { Cliente } from '../../interfaces/cliente';


@Component({
  selector: 'app-nuevo-cliente',
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css'
})
export class NuevoClienteComponent {

  route = inject(ActivatedRoute)
  router = inject(Router)
  clientesService = inject(ClientesService)
  mailingService = inject(MailingService)
  modo: 'registrar' | 'actualizar' = 'registrar';

  clienteId!: number;
  cliente: Cliente | null = null;

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

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const clienteId = params.get('clienteId');
      if (clienteId) {
        this.clienteId = Number(clienteId);
        this.loadCliente();
      } else {

      }
    });
  }

  async loadCliente() {
    try {
      // Intentar obtener el cliente desde el servicio
      this.cliente = await this.clientesService.getById(this.clienteId);

      if (this.cliente) {
        this.modo = 'actualizar';
        this.registerForm.patchValue({
          nombre: this.cliente.nombre,
          apellidos: this.cliente.apellidos,
          dni: this.cliente.dni,
          telefono: this.cliente.telefono,
          email: this.cliente.email,
          direccion: this.cliente.direccion
        });
      } else {

      }
    } catch (error) {
      console.error('Error al cargar los datos del cliente', error);
      toast.error('Error al cargar los datos del cliente');
    }
  }

  async onSubmit() {
    if (this.cliente) {
      try {
        await this.clientesService.update(this.cliente.id, this.registerForm.value);
        toast.success('Cliente actualizado correctamente');
      } catch (error) {
        toast.error('Hubo un error al actualizar el cliente');
      }
    } else {
      try {
        const nuevoCliente = await this.clientesService.register(this.registerForm.value);
        toast.success('Cliente registrado correctamente');
        setTimeout(() => {
          this.router.navigate([`/admin/cliente/${nuevoCliente.id}`]);
        }, 1500)
        this.mailingService.sendMail({
          nombre: this.registerForm.value.nombre,
          email: this.registerForm.value.email,
          mensaje: `Hola ${this.registerForm.value.nombre},

Gracias por confiar en nosotros y darte de alta en Taller Macarroni. Estamos encantados de tenerte como cliente.

Nuestro equipo está listo para ofrecerte el mejor servicio en mantenimiento y reparación de tu vehículo, con total transparencia, profesionalidad y compromiso.

Primeramente, comprueba que tus datos sean correctos:
 
Nombre: ${this.registerForm.value.nombre}
Apellidos: ${this.registerForm.value.apellidos}
DNI: ${this.registerForm.value.dni}
Teléfono: ${this.registerForm.value.telefono}
Email: ${this.registerForm.value.email}
Dirección: ${this.registerForm.value.direccion}

Si no lo son, contacta con nosotros para poder actualizarlos.

A partir de ahora, podrás recibir notificaciones sobre:
- El estado de tus reparaciones.
- Recordatorios de mantenimientos.
- Promociones especiales solo para clientes.

📍 Dirección: C/ Rueda nº 123, Ciudad Motor
📞 Teléfono: 123 456 789
🌐 Web: www.tallermacarroni.com

No dudes en escribirnos si necesitas ayuda o tienes alguna pregunta.

¡Bienvenido a la familia Macarroni!  
**Taller Macarroni – Donde tu coche está en buenas manos.**`
        });

        this.registerForm.reset();

      } catch (error) {
        toast.error('Hubo un error al registrar al cliente');
      }
    }
  }
}


