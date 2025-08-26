import { Routes } from '@angular/router';
import { VerPerfilComponent } from '../../ver-perfil/ver-perfil.component';
import { EditarPerfilComponent } from '../../editar-perfil/editar-perfil.component';

export const perfilRoutes: Routes = [
  {
    path: '',
    component: VerPerfilComponent,
    title: 'Ver Perfil'
  },
  {
    path: 'editar',
    component: EditarPerfilComponent,
    title: 'Editar Perfil'
  }
];
