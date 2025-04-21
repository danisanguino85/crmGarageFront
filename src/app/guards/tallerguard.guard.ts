import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2';

export const tallerguardGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsuariosService)
  const router = inject(Router)

  if (usersService.isMecanico()) {
    return true
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Acceso denegado: solo los mecanicos tienen permiso para acceder a esta sección.',
      confirmButtonText: 'Aceptar'
    })
  }
  router.navigate(['/login'])
  return false

};
