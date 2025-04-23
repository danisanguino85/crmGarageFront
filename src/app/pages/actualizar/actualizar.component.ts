import { Component, inject, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-actualizar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent {
  usuarioService = inject(UsuariosService)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  files: any
  router = inject(Router)
  @Input() usuarioId = 0


  formulario: FormGroup = new FormGroup({
    foto_perfil: new FormControl('')
  })

  onSubmit() {
    const fd = new FormData();
    fd.append('imagen', this.files[0]);
    this.usuarioService.updateFoto(fd, this.usuarioId)
      .then(result => {
        this.router.navigate(['/admin', 'usuario', this.usuarioId]);
      })
      .catch(err => {
        console.log(err)
      })


  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onChange($event: any) {
    this.files = $event.target.files;
  }
}
