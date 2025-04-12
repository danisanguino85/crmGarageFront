import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-detalle-reparacion',
  imports: [],
  templateUrl: './detalle-reparacion.component.html',
  styleUrl: './detalle-reparacion.component.css'
})
export class DetalleReparacionComponent {
  reparacionesServices = inject(ReparacionesService);
  @Input() idReparaciones: String = ''
  

 async ngOnInit(){
   //getById  repaciones
   try {
    const reparacione = await this.reparacionesServices.getByIdReparaciones(this.idReparaciones)
    console.log(reparacione)
  } catch (error: any) {
    console.log(error.error.message)
  }
  }
   
}
