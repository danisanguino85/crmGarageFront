import type { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { DetalleClienteComponent } from './pages/detalle-cliente/detalle-cliente.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: '/inicio' },
    { path: 'inicio', component: LoginComponent },
    { path: 'nuevo', component: NuevoClienteComponent },
    { path: 'cliente/:clienteId', component: DetalleClienteComponent },
    { path: 'admin', component: DashboardAdminComponent },
    { path: 'clientes', component: ListaClientesComponent },
    { path: '**', redirectTo: '/inicio' },



];
