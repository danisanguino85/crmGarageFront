import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-notas',
  imports: [RouterLink],
  templateUrl: './detalle-notas.component.html',
  styleUrl: './detalle-notas.component.css'
})
export class DetalleNotasComponent {
 activatedRoute = inject(ActivatedRoute);
 reparacionId: any|string;

  ngOnInit() {

    
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {
      
     this.reparacionId = params.reparacionId
        
     console.log()
    });
  }

}
