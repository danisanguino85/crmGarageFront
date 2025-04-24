import { Component, inject, Input } from '@angular/core';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { Router, RouterModule } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-usuario',
  imports: [RouterModule, NgxSonnerToaster, TitleCasePipe, DatePipe],
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent {
  @Input() usuarioId = 0
  usuario!: Usuario
  usuariosService = inject(UsuariosService)
  mostrarFormulario = false;
  router = inject(Router)


  async ngOnInit() {
    try {
      await this.getUsuario();
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async getUsuario() {
    try {
      this.usuario = await this.usuariosService.getById(this.usuarioId);
      // Establecer el usuario en el servicio
      this.usuariosService.setUsuario(this.usuario);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {

      toast.error(error.message)
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  actualizarFoto($event: any) {
    this.router.navigate(['/admin/actualizar'], { queryParams: { usuarioId: this.usuarioId } });
  }

  // Método para mostrar el formulario en el componente "Nuevo Usuario"
  onEditUsuario() {
    this.mostrarFormulario = true;
  }
}

