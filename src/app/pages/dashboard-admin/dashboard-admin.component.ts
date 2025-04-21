import { Component, inject, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { VehiculosService } from '../../services/vehiculos.service';
import { ReparacionesService } from '../../services/reparaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import type { Usuario } from '../../interfaces/usuario';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink,],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

  vehiculosService = inject(VehiculosService)
  clientesService = inject(ClientesService)
  usuariosService = inject(UsuariosService)
  reparacionesService = inject(ReparacionesService)
  usuario!: Usuario
  selectedTab = ''
  activatedRoute = false
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
    this.horaRegistro = localStorage.getItem('horaRegistro') || ''
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
    this.searchReparacionForm.reset()
    this.router.navigate([`/admin/reparacion/${this.reparacionId}`])
  }

  async onSubmitMatricula() {
    const response = await this.vehiculosService.getVehiculo(this.searchVehiculoForm.value)
    this.searchVehiculoForm.reset()
    this.vehiculoId = response.id
    this.router.navigate([`/admin/vehiculo/${this.vehiculoId}`])
  }

  async onSubmitEmpleado() {
    const response = await this.usuariosService.getByEmail(this.searchEmpleadoForm.value)
    this.searchEmpleadoForm.reset()
    this.usuarioId = response.id
    this.router.navigate([`/admin/usuario/${this.usuarioId}`])

  }

  async loadUsuario() {
    const data = this.usuariosService.tokenDecodificado()

    if (data) {
      this.usuario = await this.usuariosService.getById(data.id)

    }

  }

  selectTab(tab: string) {
    this.selectedTab = tab
  }

  activated() {
    this.activatedRoute = true
  }
  nonActivated() {
    this.activatedRoute = false
  }



}
