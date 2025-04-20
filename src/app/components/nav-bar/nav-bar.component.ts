import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { RegistroLaboralService } from '../../services/registro-laboral.service';
import dayjs from 'dayjs';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  usuario!: Usuario
  router = inject(Router)
  usuariosService = inject(UsuariosService)
  registroService = inject(RegistroLaboralService)
  trabajando = false

  ngOnInit() {
    this.loadUsuario()
  }

  async loadUsuario() {
    const data = this.usuariosService.tokenDecodificado()

    if (data) {
      this.usuario = await this.usuariosService.getById(data.id)
    }

  }
  async registerEntrada() {
    await this.registroService.insertEntrada(
      {
        entrada: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        usuarios_id: this.usuario.id
      }
    )
    this.trabajando = true
  }
  async registerSalida() {
    await this.registroService.inserSalida(
      {
        salida: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        usuarios_id: this.usuario.id
      }
    )
    this.trabajando = false
  }
}
