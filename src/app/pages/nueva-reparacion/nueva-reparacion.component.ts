import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { VehiculosService } from '../../services/vehiculos.service';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { MailingService } from '../../services/mailing.service';
import { ClientesService } from '../../services/clientes.service';
import type { Cliente } from '../../interfaces/cliente';
import type { Reparacion } from '../../interfaces/reparacion';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nueva-reparacion',
  imports: [ReactiveFormsModule, NgxSonnerToaster, TitleCasePipe],
  templateUrl: './nueva-reparacion.component.html',
  styleUrl: './nueva-reparacion.component.css'
})
export class NuevaReparacionComponent {
  usuariosService = inject(UsuariosService)
  reparacionesServices = inject(ReparacionesService);
  vehiculosService = inject(VehiculosService)
  router = inject(Router)
  mecanicos: Usuario[] = []
  vehiculos: Vehiculo[] = []
  vehiculoId: number | undefined;
  vehiculo!: Vehiculo

  route = inject(ActivatedRoute)
  clienteId!: number
  activatedRoute = inject(ActivatedRoute);
  mailingService = inject(MailingService)
  clientesService = inject(ClientesService)
  cliente!: Cliente
  nuevaReparacion!: Reparacion
  fecha = ''

  formRegistro: FormGroup = new FormGroup({
    vehiculos_id: new FormControl('', [
      Validators.required
    ]),
    notas: new FormControl('', [
      Validators.required
    ]),
    presupuesto: new FormControl('', [
      Validators.required
    ]),
    usuarios_id: new FormControl('', [
      Validators.required
    ]),
  })

  fechaReparacion() {
    const fecha = new Date
    this.fecha = fecha.toLocaleString().substring(0, 20)

  }

  async ngOnInit() {
    this.loadMecanicos()
    this.loadVehiculos()
    this.loadCliente()

  }

  async onSubmit() {
    this.fechaReparacion()
    try {
      if (this.formRegistro.valid) {
        this.nuevaReparacion = await this.reparacionesServices.register(this.formRegistro.value);
        this.getVehiculo()
        this.formRegistro.reset()
        toast.success('Confirmación de ingreso de su vehículo en Taller JMD');
        await this.mailingService.sendMail({
          nombre: this.cliente.nombre,
          email: this.cliente.email,
          mensaje: `Hola ${this.cliente.nombre},

Gracias por confiar en Taller JMD.

Te confirmamos que hemos recibido tu vehículo en día y hora ${this.fecha} para la revisión/reparación solicitada. Nuestro equipo ya está trabajando en el diagnóstico y te mantendremos informado sobre el estado de la reparación y cualquier detalle adicional que debamos comentarte.

Datos del ingreso:

    Vehículo: ${this.vehiculo.marca} ${this.vehiculo.modelo} con matrícula ${this.vehiculo.matricula}


    Número de nota de taller: ${this.nuevaReparacion.id}

    Estado actual: ${this.nuevaReparacion.estado}

Saludos,
Equipo de Taller JMD
  
  📍 Dirección: C/ Rueda nº 123, Ciudad Motor  
  📞 Teléfono: 123 456 789  
  🌐 Web: www.tallerjmd.com
  
  No dudes en escribirnos si necesitas ayuda o tienes alguna pregunta.
  

  **Taller JMD – Donde tu coche está en buenas manos.**`
        });

      } else {
        toast.error('Por favor completa correctamente el formulario');
      }
    } catch (error: any) {
      toast.error(error.message);//hay que ver por qué salta el aviso cuando funciona
    }
  }

  async loadMecanicos() {
    try {
      const usuarios = await this.usuariosService.getAll()

      this.mecanicos = usuarios.filter((usuario) => usuario.rol === 'mecanico');
    } catch (error: any) {
      toast.error(error.message)
    }

  }

  async loadVehiculos() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {
      this.clienteId = params.clienteId
    });
    this.vehiculos = await this.vehiculosService.getVehiculosByClienteId(this.clienteId)
  }
  async loadCliente() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {
      this.clienteId = params.clienteId
      this.cliente = await this.clientesService.getById(this.clienteId)
    });
  }

  async getVehiculo() {
    this.vehiculo = await this.vehiculosService.getVehiculoByReparacion(
      {
        id: this.nuevaReparacion.id
      }
    )

  }

  checkControl(controlName: string, errorName: string): boolean {
    const control = this.formRegistro.get(controlName);
    return !!control && control.hasError(errorName) && control.touched;
  }
}
