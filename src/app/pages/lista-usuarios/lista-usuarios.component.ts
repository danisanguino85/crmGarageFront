import { Component, inject } from '@angular/core';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  imports: [RouterLink],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

  arrUsuario: Usuario[] = []
  usuarioService = inject(UsuariosService);

  async ngOnInit() {
    this.arrUsuario = await this.usuarioService.getAll()
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async filtrarPorRol($event: any) {
    console.log($event.target.value)
    if ($event.target.value === 'admin') {
      this.arrUsuario = await this.usuarioService.getAdmin()
    } else {
      this.arrUsuario = await this.usuarioService.getMecanico()
    } if ($event.target.value === '') {
      this.arrUsuario = await this.usuarioService.getAll()
    }
  }
}

