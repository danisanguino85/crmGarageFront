import { Component, inject, Input } from '@angular/core';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-detalle-usuario',
  imports: [],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent {
  @Input() usuarioId = 0
  usuario!: Usuario
  usuariosService = inject(UsuariosService)

  async ngOnInit() {
    await this.getUsuario()
  }


  async getUsuario() {
    try {
      this.usuario = await this.usuariosService.getById(this.usuarioId)
      console.log(this.usuario)
    } catch (error) {

    }
  }
}
