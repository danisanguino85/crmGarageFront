import type { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { DetalleClienteComponent } from './pages/detalle-cliente/detalle-cliente.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { ListaReparacionesComponent } from './pages/lista-reparaciones/lista-reparaciones.component';
import { DetalleReparacionComponent } from './pages/detalle-reparacion/detalle-reparacion.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: '/inicio' },
    { path: 'inicio', component: LoginComponent },
    { path: 'registro/usuario', component: NuevoUsuarioComponent },
    { path: 'nuevo', component: NuevoClienteComponent },
    { path: 'cliente/:clienteId', component: DetalleClienteComponent },
    { path: 'admin', component: DashboardAdminComponent },
    { path: 'clientes', component: ListaClientesComponent },
    {path: 'reparaciones', component: ListaReparacionesComponent},
    {path: 'reparaciones/:idReparaciones', component: DetalleReparacionComponent},
    { path: '**', redirectTo: '/inicio' },



];
