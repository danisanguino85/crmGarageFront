import { Component, inject } from '@angular/core';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  imports: [RouterLink],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {


  usuarios: Usuario[] = []
  mecanicos: Usuario[] = []
  administradores: Usuario[] = []
  usuarioService = inject(UsuariosService);

  async ngOnInit() {
    this.usuarios = await this.usuarioService.getAll()
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async filtrarPorRol($event: any) {
    console.log($event.target.value)
    if ($event.target.value === 'admin') {
      this.usuarios = await this.usuarioService.getAdmin()
    } else {
      this.usuarios = await this.usuarioService.getMecanico()
    } if ($event.target.value === '') {
      this.usuarios = await this.usuarioService.getAll()
    }
  }
}

