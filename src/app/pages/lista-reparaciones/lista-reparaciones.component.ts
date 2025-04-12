import { Component, inject, Input } from '@angular/core';
import { ReparacionesService } from '../../services/reparaciones.service';

@Component({
  selector: 'app-lista-reparaciones',
  imports: [],
  templateUrl: './lista-reparaciones.component.html',
  styleUrl: './lista-reparaciones.component.css'
})
export class ListaReparacionesComponent {


  reparacionesServices = inject(ReparacionesService);
  



 async ngOnInit(){

  //get all reparaciones
  try {
    const reparaciones = await this.reparacionesServices.getAllReparaciones()
    console.log(reparaciones)
  } catch (error: any) {
    console.log(error.error.message)
  } 


  }




}
