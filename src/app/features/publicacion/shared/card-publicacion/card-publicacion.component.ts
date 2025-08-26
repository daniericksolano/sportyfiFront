import { Component, Input } from '@angular/core';
import { Publicacion } from '../../../../shared/models/publicacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-publicacion',
  imports: [
  ],
  templateUrl: './card-publicacion.component.html',
  styleUrl: './card-publicacion.component.scss'
})
export class CardPublicacionComponent {
  @Input() publicacion: Publicacion | null = null;

  constructor(private router: Router) {}

  ver(id: number) {
    this.router.navigate(['/publicaciones/ver', id]);
  }

  editar(id: number) {
    this.router.navigate(['/publicaciones/editar', id]);
  }
}
