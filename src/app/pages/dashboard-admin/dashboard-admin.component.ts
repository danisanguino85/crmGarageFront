import { Component, inject, Input } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

  clientesService = inject(ClientesService)
  router = inject(Router)
  @Input() clienteId = 0
  searchForm: FormGroup = new FormGroup({
    email: new FormControl(),

  })
  async onSubmit() {
    const response = await this.clientesService.getByEmail(this.searchForm.value);
    this.clienteId = response.id
    this.router.navigate([`/cliente/${this.clienteId}`])
  }

}
