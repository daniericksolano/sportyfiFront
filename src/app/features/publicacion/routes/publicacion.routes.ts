import { Routes } from '@angular/router';
import { ListaPublicacionComponent } from '../lista-publicacion/lista-publicacion.component';
import { CrearPublicacionComponent } from '../crear-publicacion/crear-publicacion.component';
import { EditarPublicacionComponent } from '../editar-publicacion/editar-publicacion.component';
import { VerPublicacionComponent } from '../ver-publicacion/ver-publicacion.component';

export const publicacionRoutes: Routes = [
  {
    path: '',
    component: ListaPublicacionComponent,
    title: 'Lista de Publicaciones'
  },
  {
    path: 'crear',
    component: CrearPublicacionComponent,
    title: 'Crear Publicación'
  },
  {
    path: 'editar/:id',
    component: EditarPublicacionComponent,
    title: 'Editar Publicación'
  },
  {
    path: 'ver/:id',
    component: VerPublicacionComponent,
    title: 'Ver Publicación'
  }
];