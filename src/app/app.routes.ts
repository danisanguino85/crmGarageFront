import type { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { DetalleClienteComponent } from './pages/detalle-cliente/detalle-cliente.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { ListaReparacionesComponent } from './pages/lista-reparaciones/lista-reparaciones.component';
import { DetalleReparacionComponent } from './pages/detalle-reparacion/detalle-reparacion.component';
import { ListaVehiculosComponent } from './pages/lista-vehiculos/lista-vehiculos.component';
import { DetalleVehiculoComponent } from './pages/detalle-vehiculo/detalle-vehiculo.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './pages/detalle-usuario/detalle-usuario.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: '/inicio' },
    { path: 'inicio', component: LoginComponent },
    { path: 'registro/usuario', component: NuevoUsuarioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'usuarios', component: ListaUsuariosComponent },
    { path: 'usuario/:usuarioId', component: DetalleUsuarioComponent },
    { path: 'nuevo', component: NuevoClienteComponent },
    { path: 'cliente/:clienteId', component: DetalleClienteComponent },
    { path: 'admin', component: DashboardAdminComponent },
    { path: 'clientes', component: ListaClientesComponent },
    { path: 'reparaciones', component: ListaReparacionesComponent },
    { path: 'reparaciones/:idReparaciones', component: DetalleReparacionComponent },
    { path: 'vehiculos', component: ListaVehiculosComponent },
    { path: 'vehiculos/:vehiculoId', component: DetalleVehiculoComponent },

    { path: '**', redirectTo: '/inicio' },



];
