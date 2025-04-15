import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../services/usuarios.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const usersService = inject(UsuariosService)
    const router = inject(Router)

    if (usersService.isAdmin())
        return true
    Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tienes permisos para acceder a esta sección',
        confirmButtonText: 'Aceptar'
    })
    router.navigate(['/admin'])
    return false

};
