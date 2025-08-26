import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login-component/login-component';
import { RegistroComponent } from './features/auth/registro-component/registro-component';
import { publicacionRoutes } from './features/publicacion/routes/publicacion.routes';
import { perfilRoutes } from './features/perfil/shared/routes/publicacion.routes';

export const routes: Routes = [
{ path: '', redirectTo: 'publicaciones', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'publicaciones', children: publicacionRoutes },

  { path: 'perfil', children: perfilRoutes },

  { path: '**', redirectTo: 'publicaciones' }
];