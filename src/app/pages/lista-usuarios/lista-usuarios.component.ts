import { Component, inject } from '@angular/core';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

  arrUsuario: Usuario[] = []

  usuarioService = inject(UsuariosService);

  async ngOnInit() {
    this.arrUsuario = await this.usuarioService.getAll()
  }

}
