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
import { NuevoVehiculoComponent } from './pages/nuevo-vehiculo/nuevo-vehiculo.component';
import { ListaNotasComponent } from './pages/lista-notas/lista-notas.component';
import { ReparacionAdminComponent } from './pages/reparacion-admin/reparacion-admin.component';
import { adminGuard } from './guards/admin.guard';
import { tallerguardGuard } from './guards/tallerguard.guard';
import { authtGuard } from './guards/autht.guard';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: '/inicio' },
    { path: 'inicio', component: LoginComponent },
    /*  { path: 'registro/usuario', component: NuevoUsuarioComponent },
     { path: 'login', component: LoginComponent },
     { path: 'cliente/:clienteId', component: DetalleClienteComponent },
     { path: 'clientes', component: ListaClientesComponent }, */



    //rutas hija del admin
    {
        path: 'admin', component: DashboardAdminComponent, canActivate: [authtGuard, adminGuard], children: [
            { path: 'usuarios', component: ListaUsuariosComponent },
            { path: 'reparaciones', component: ListaReparacionesComponent },
            { path: 'vehiculo/:vehiculoId', component: DetalleVehiculoComponent },
            { path: 'reparacion/:reparacionId', component: ReparacionAdminComponent },
            { path: 'usuario/:usuarioId', component: DetalleUsuarioComponent },
            { path: 'usuario/:usuarioId/editarUsuario', component: NuevoUsuarioComponent },
            { path: 'clientes', component: ListaClientesComponent },
            { path: 'nuevoCliente', component: NuevoClienteComponent },
            { path: 'nuevoEmpleado', component: NuevoUsuarioComponent },
            { path: 'nuevaReparacion', component: NuevaReparacionComponent },
            { path: 'vehiculos', component: ListaVehiculosComponent },
            { path: 'actualizar', component: ActualizarComponent },

            {
                path: 'cliente/:clienteId', component: DetalleClienteComponent, children: [

                    { path: 'nuevoVehiculo', component: NuevoVehiculoComponent },
                    { path: 'nuevaNota', component: NuevaReparacionComponent },
                    { path: 'editarCliente', component: NuevoClienteComponent },
                    { path: 'editarUsuario', component: NuevoUsuarioComponent }
                ]
            },
        ]
    },

    //rutas del mecanico
    { path: 'taller', component: DashboardMecanicoComponent, canActivate: [authtGuard, tallerguardGuard] },
    {
        path: 'reparacion/:reparacionId', component: DetalleReparacionComponent,
        children: [
            { path: 'vehiculo', component: DetalleVehiculoComponent },
            { path: 'cliente', component: DetalleClienteComponent },
            { path: 'notas', component: ListaNotasComponent },
            { path: 'notas/:notaId', component: ListaNotasComponent },
        ]
    },

    /*     { path: 'reparaciones', component: ListaReparacionesComponent }, */

    {
        path: 'reparaciones/:idReparaciones', component: DetalleReparacionComponent, children: [
            { path: 'vehiculo', component: ListaReparacionesComponent },
            { path: 'cliente/:clienteId', component: ListaReparacionesComponent },
        ]
    },
    /*   { path: 'cliente/:clienteId', component: DetalleClienteComponent },
      { path: 'registro/reparaciones', component: NuevaReparacionComponent },
      { path: 'vehiculos/:vehiculoId', component: DetalleVehiculoComponent }, */






    { path: '**', redirectTo: '/inicio' },



];


/* {path: 'taller/reparacion/:reparacionId', component: DetalleReparacionComponent, children: [
            { path: 'vehiculo', component: DetalleVehiculoComponent },
            { path: 'cliente', component: DetalleClienteComponent },
        ]
    },
 */


/*   /*  { path: 'reparaciones/:idReparaciones', component: ListaReparacionesComponent }, */


/* children: [
               { path: 'reparaciones/:reparacionId', component: DetalleReparacionComponent, children:[
                  { path: 'vehiculo', component: DetalleVehiculoComponent },
                  { path: 'cliente', component: DetalleClienteComponent }, 
              ] }, 
        ] */