import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import dayjs from 'dayjs';
import { UsuariosService } from '../../services/usuarios.service';
import { RegistroLaboralService } from '../../services/registro-laboral.service';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import type { Usuario } from '../../interfaces/usuario';
import { RouterLink } from '@angular/router';

type Registros = {
  entrada?: string,
  salida?: string,
  usuarios_id: number
}

@Component({
  selector: 'app-home-admin',
  imports: [DatePipe, RouterLink],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  usuariosService = inject(UsuariosService)
  registroService = inject(RegistroLaboralService)
  entradas: Registros[] = []
  salidas: Registros[] = []
  usuario!: Usuario
  horaRegistro = ''
  @Input() usuarioId? = 0


  ngOnInit() {
    this.loadRegistros()
    this.horaRegistro = localStorage.getItem('horaRegistro') || ''
  }




  async loadRegistros() {
    const data = this.usuariosService.tokenDecodificado();

    try {
      if (data) {
        this.usuario = await this.usuariosService.getById(data.id)
      }
      const entradas = await this.registroService.getLatestEntradas(this.usuario.id)
      const salidas = await this.registroService.getLatestSalidas(this.usuario.id)

      entradas.map((entrada: Registros) => {
        const fechaEntrada = dayjs(entrada.entrada).format('YYYY-MM-DD HH:mm:ss')
        this.entradas.push({
          entrada: fechaEntrada,
          usuarios_id: entrada.usuarios_id
        })
      })
      salidas.map((salida: Registros) => {
        const fechaSalida = dayjs(salida.salida).format('YYYY-MM-DD HH:mm:ss')
        this.salidas.push({
          salida: fechaSalida,
          usuarios_id: salida.usuarios_id
        })
      })

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast.error(error.message)
    }
  }


}
