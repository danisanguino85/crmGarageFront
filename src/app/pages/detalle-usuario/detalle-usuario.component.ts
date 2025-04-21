import { Component, inject, Input } from '@angular/core';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterModule } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-detalle-usuario',
  imports: [RouterModule, NgxSonnerToaster],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent {
  @Input() usuarioId = 0
  usuario!: Usuario
  usuariosService = inject(UsuariosService)
  mostrarFormulario = false;


  async ngOnInit() {
    try {
      await this.getUsuario();
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async getUsuario() {
    try {
      this.usuario = await this.usuariosService.getById(this.usuarioId);
      // Establecer el usuario en el servicio
      this.usuariosService.setUsuario(this.usuario);
    } catch (error: any) {

      toast.error(error.message)
    }
  }

  // Método para mostrar el formulario en el componente "Nuevo Usuario"
  onEditUsuario() {
    this.mostrarFormulario = true;
  }
}

