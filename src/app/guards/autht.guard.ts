import { Router, type CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment.development';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';

export const authtGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem(environment.tokenName);

    if (token) {
        return true;
    }

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tienes permisos para acceder a esta página.',
        confirmButtonText: 'aceptar',
        showConfirmButton: true,
    })

    const router = inject(Router)
    router.navigate(['/login']);

    return false;

};
