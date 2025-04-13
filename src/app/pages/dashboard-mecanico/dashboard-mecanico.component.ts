import { Component } from '@angular/core';
import { ListaReparacionesComponent } from "../lista-reparaciones/lista-reparaciones.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-mecanico',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-mecanico.component.html',
  styleUrl: './dashboard-mecanico.component.css'
})
export class DashboardMecanicoComponent {

}
