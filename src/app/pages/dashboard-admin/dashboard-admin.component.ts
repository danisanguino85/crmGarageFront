import { Component, inject, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { VehiculosService } from '../../services/vehiculos.service';
import { ReparacionesService } from '../../services/reparaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import type { Usuario } from '../../interfaces/usuario';
import { RegistroLaboralService } from '../../services/registro-laboral.service';
import { DatePipe } from '@angular/common';
import { NgxSonnerToaster, toast } from 'ngx-sonner';




@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, DatePipe, NgxSonnerToaster],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

  vehiculosService = inject(VehiculosService)
  clientesService = inject(ClientesService)
  usuariosService = inject(UsuariosService)
  reparacionesService = inject(ReparacionesService)
  registroService = inject(RegistroLaboralService)
  usuario!: Usuario
  selectedTab = ''
  horaRegistro = ''
  router = inject(Router)


  @Input() clienteId = 0
  @Input() vehiculoId = 0
  @Input() reparacionId? = 0
  @Input() usuarioId? = 0




  searchClienteForm: FormGroup = new FormGroup({
    telefono: new FormControl(),

  })
  searchVehiculoForm: FormGroup = new FormGroup({
    matricula: new FormControl(),

  })
  searchReparacionForm: FormGroup = new FormGroup({
    notaTaller: new FormControl(),

  })
  searchEmpleadoForm: FormGroup = new FormGroup({
    email: new FormControl(),

  })

  ngOnInit() {
    this.loadUsuario()

  }

  async onSubmitCliente() {
    const response = await this.clientesService.getByTelefono(this.searchClienteForm.value);
    this.searchClienteForm.reset()
    this.clienteId = response.id
    this.router.navigate([`/admin/cliente/${this.clienteId}`])
  }

  async onSubmitReparacion() {
    const response = await this.reparacionesService.getReparacionById(this.searchReparacionForm.value.notaTaller);
    this.reparacionId = response.id
    this.router.navigate([`/admin/reparacion/${this.reparacionId}`])
    this.searchReparacionForm.reset()
  }

  async onSubmitMatricula() {
    const response = await this.vehiculosService.getVehiculo(this.searchVehiculoForm.value)
    this.searchVehiculoForm.reset()
    this.vehiculoId = response.id
    this.router.navigate([`/admin/vehiculo/${this.vehiculoId}`])
  }

  async onSubmitEmpleado() {
    const response = await this.usuariosService.getByEmail(this.searchEmpleadoForm.value)

    this.usuarioId = response.id
    this.router.navigate([`/admin/usuario/${this.usuarioId}`])
    this.searchEmpleadoForm.reset()

  }

  async loadUsuario() {
    const data = this.usuariosService.tokenDecodificado()

    try {
      if (data) {
        this.usuario = await this.usuariosService.getById(data.id)

      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.message)
    }

  }
  selectTab(tab: string) {
    this.selectedTab = tab
  }





}


