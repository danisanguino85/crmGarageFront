import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-notas',
  imports: [],
  templateUrl: './detalle-notas.component.html',
  styleUrl: './detalle-notas.component.css'
})
export class DetalleNotasComponent {
  activatedRoute = inject(ActivatedRoute);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  reparacionId: any | string;

  ngOnInit() {


    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.activatedRoute.parent!.params.subscribe(async (params: any) => {

      this.reparacionId = params.reparacionId


    });
  }

}
