import { Component, inject, Input } from '@angular/core';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-usuario',
  imports: [RouterModule],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent {
  @Input() usuarioId = 0
  usuario!: Usuario
  usuariosService = inject(UsuariosService)
  mostrarFormulario = false;

  /*   async ngOnInit() {
      await this.getUsuario()
    }
  
    async getUsuario() {
      try {
        this.usuario = await this.usuariosService.getById(this.usuarioId)
      } catch (error) {
      }
    }
   */

  async ngOnInit() {
    await this.getUsuario();
  }

  async getUsuario() {
    try {
      this.usuario = await this.usuariosService.getById(this.usuarioId);
      // Establecer el usuario en el servicio
      this.usuariosService.setUsuario(this.usuario);
    } catch (error) {
      console.error('Error al obtener el usuario', error);
    }
  }

  // Método para mostrar el formulario en el componente "Nuevo Usuario"
  onEditUsuario() {
    this.mostrarFormulario = true;
  }
}

