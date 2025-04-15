import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';



@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  usuario!: Usuario
  router = inject(Router)
  usuariosService = inject(UsuariosService)

  ngOnInit() {
    this.loadUsuario()


  }

  logout() {
    this.router.navigate(['/login'])
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }

  async loadUsuario() {
    const data = this.usuariosService.tokenDecodificado()

    if (data) {
      this.usuario = await this.usuariosService.getById(data.id)
    }

  }




}
