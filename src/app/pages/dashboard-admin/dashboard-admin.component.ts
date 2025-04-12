import { Component, inject, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

  vehiculosService = inject(VehiculosService)
  clientesService = inject(ClientesService)
  router = inject(Router)
  @Input() clienteId = 0
  @Input() vehiculoId = 0

  searchClienteForm: FormGroup = new FormGroup({
    email: new FormControl(),

  })
  searchVehiculoForm: FormGroup = new FormGroup({
    matricula: new FormControl(),

  })


  async onSubmitCliente() {
    const response = await this.clientesService.getByEmail(this.searchClienteForm.value);
    this.clienteId = response.id
    this.router.navigate([`/cliente/${this.clienteId}`])
  }

  async onSubmitMatricula() {
    const response = await this.vehiculosService.getVehiculo(this.searchVehiculoForm.value)
    console.log(response)
    this.vehiculoId = response.id
    this.router.navigate([`/vehiculos/${this.vehiculoId}`])
  }

}
