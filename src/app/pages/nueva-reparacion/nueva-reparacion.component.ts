import { Component, inject } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-nueva-reparacion',
  imports: [],
  templateUrl: './nueva-reparacion.component.html',
  styleUrl: './nueva-reparacion.component.css'
})
export class NuevaReparacionComponent {

  reparacionesServices = inject(ReparacionesService);


  ngOnInit(){
    
  }
}
