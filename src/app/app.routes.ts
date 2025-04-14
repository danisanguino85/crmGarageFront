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
import { DashboardMecanicoComponent } from './pages/dashboard-mecanico/dashboard-mecanico.component';
import { NuevaReparacionComponent } from './pages/nueva-reparacion/nueva-reparacion.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: '/inicio' },
    { path: 'inicio', component: LoginComponent },
    { path: 'registro/usuario', component: NuevoUsuarioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'usuarios', component: ListaUsuariosComponent },
    { path: 'usuario/:usuarioId', component: DetalleUsuarioComponent },
    { path: 'nuevo', component: NuevoClienteComponent },
    { path: 'cliente/:clienteId', component: DetalleClienteComponent },
    { path: 'clientes', component: ListaClientesComponent },

    //rutas hija del admin
    {
        path: 'admin', component: DashboardAdminComponent, children: [
            { path: 'clientes', component: ListaClientesComponent },
            { path: 'cliente/:clienteId', component: DetalleClienteComponent },
            { path: 'usuarios', component: ListaUsuariosComponent },
            { path: 'usuario/:usuarioId', component: DetalleUsuarioComponent },
            { path: 'reparaciones', component: ListaReparacionesComponent },
            { path: 'vehiculo/:vehiculoId', component: DetalleVehiculoComponent },
            { path: 'reparacion/:reparacionId', component: DetalleReparacionComponent },
        ]
    },




    { path: 'reparaciones', component: ListaReparacionesComponent },
    /* desde el panel mecanico acceder a los diferentes componentes */
    {
        path: 'taller/reparacion/:reparacionId', component: DetalleReparacionComponent, children: [
            { path: 'vehiculo', component: DetalleVehiculoComponent },
            { path: 'cliente', component: DetalleClienteComponent },
        ]
    },


    {
        path: 'reparaciones/:idReparaciones', component: DetalleReparacionComponent, children: [
            { path: 'vehiculo', component: ListaReparacionesComponent },
            { path: 'cliente/:clienteId', component: ListaReparacionesComponent },
        ]
    },
    { path: 'cliente/:clienteId', component: DetalleClienteComponent },
    { path: 'registro/reparaciones', component: NuevaReparacionComponent },
    { path: 'vehiculos', component: ListaVehiculosComponent },
    { path: 'vehiculos/:vehiculoId', component: DetalleVehiculoComponent },

    {
        path: 'taller', component: DashboardMecanicoComponent, children: [
            /*   { path: 'reparaciones/:reparacionId', component: DetalleReparacionComponent, children:[
                  { path: 'vehiculo', component: DetalleVehiculoComponent },
                  { path: 'cliente', component: DetalleClienteComponent }, 
              ] }, */
        ]
    },


    { path: '**', redirectTo: '/inicio' },



];


/*   /*  { path: 'reparaciones/:idReparaciones', component: ListaReparacionesComponent }, */ 