import type { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: '/inicio' },
    { path: 'inicio', component: LoginComponent },
    { path: 'registro/usuario', component: NuevoUsuarioComponent },
    { path: '**', redirectTo: '/inicio' }



];
