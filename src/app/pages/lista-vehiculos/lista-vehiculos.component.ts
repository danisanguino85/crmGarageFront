import { Component, inject } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import type { Vehiculo } from '../../interfaces/vehiculo';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-lista-vehiculos',
  imports: [RouterLink, DatePipe],
  templateUrl: './lista-vehiculos.component.html',
  styleUrl: './lista-vehiculos.component.css'
})
export class ListaVehiculosComponent {

  vehiculos: Vehiculo[] = []
  vehiculosService = inject(VehiculosService)



  async ngOnInit() {
    await this.loadVehiculos()
  }

  async loadVehiculos() {
    try {
      this.vehiculos = await this.vehiculosService.getAll()
    } catch (error) {

    }
  }
  /*exportarPdf() {
    const options = {
      margin: 0.5,
      filename: 'documento.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(this.pdfContent.nativeElement).set(options).save();
  }*/

}

