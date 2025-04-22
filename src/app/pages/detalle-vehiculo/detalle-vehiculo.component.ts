import { Component, inject, Input } from '@angular/core';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { VehiculosService } from '../../services/vehiculos.service';
import { ActivatedRoute } from '@angular/router';
import { ReparacionesService } from '../../services/reparaciones.service';
import { DatePipe } from '@angular/common';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-detalle-vehiculo',
  imports: [DatePipe, NgxSonnerToaster],
  templateUrl: './detalle-vehiculo.component.html',
  styleUrl: './detalle-vehiculo.component.css'
})
export class DetalleVehiculoComponent {

  vehiculo: Vehiculo | undefined
  vehiculon:  Vehiculo | undefined
  vehiculosService = inject(VehiculosService)
  usuariosService = inject(UsuariosService)
  reparacionesService = inject(ReparacionesService);
  activatedRoute = inject(ActivatedRoute);
  mecanicoAdmin: boolean = false;


  @Input() vehiculoId = 0


  async ngOnInit() {

    try {
      const data = this.usuariosService.tokenDecodificado()
      if (data?.rol === 'mecanico') {
        this.mecanicoAdmin = true;
      };
    } catch (error: any) {
      toast.error(error.message)
    }

  
   if(this.mecanicoAdmin){
    try {
      this.activatedRoute.parent!.params.subscribe(async (params: any) => {
        const body = {
          id: params.reparacionId
        }
        this.vehiculon = await this.vehiculosService.getVehiculoByReparacion(body) 
      }); 
    } catch (error: any) {
      toast.error(error.message)
    } 

   }else {
     await this.loadVehiculo()
   }



    
    /*  try {
         this.activatedRoute.parent!.params.subscribe(async (params: any) => {
           const body = {
             id: params.reparacionId
           }
           this.vehiculon = await this.vehiculosService.getVehiculoByReparacion(body) 
         });
   
          
       } catch (error: any) {
         toast.error(error.message)
       }  */
    
  }


  async loadVehiculo() {
    try {
      this.vehiculo = await this.vehiculosService.getVehiculoById(this.vehiculoId)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

}
