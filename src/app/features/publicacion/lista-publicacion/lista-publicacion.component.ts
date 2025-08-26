import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CardPublicacionComponent } from "../shared/card-publicacion/card-publicacion.component";
import { Publicacion } from '../../../shared/models/publicacion.model';
import { Deportista } from '../../../shared/models/deportista.model';
import { PublicacionService } from '../shared/service/publicacion-service';

@Component({
  selector: 'app-lista-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    CardPublicacionComponent,
    RouterLink
],
  templateUrl: './lista-publicacion.component.html'
})
export class ListaPublicacionComponent implements OnInit {
  publicacionService = inject(PublicacionService);
  router = inject(Router);

  publicaciones: Publicacion[] = [
    {
      id: 1,
      titulo: "Lionel Messi",
      deporte: "Fútbol",
      posicionDeporte: "Delantero",
      descripcion: "Jugador argentino considerado uno de los mejores del mundo y una leyenda en el futbol español con el FC Barcelona.",
      imagen: "https://scontent.fclo9-1.fna.fbcdn.net/v/t39.30808-6/475110431_122154113450339805_3961711523964111827_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGlI7_dGL0QfMqpmM_urMuVSuL8P-TlhoRK4vw_5OWGhAaOh6ClNqZR8OxoWMT0EnpLyey6uWAdvrpCkUs7ehYO&_nc_ohc=ktqavxkcymAQ7kNvwFxuxn5&_nc_oc=AdnvN4zp95c6eeWx7ROVOPq5tGJ7kXUomUSDnUoSX3owomPkuvJ56_o13UpOZsaAlPc&_nc_zt=23&_nc_ht=scontent.fclo9-1.fna&_nc_gid=TCG0fsdU5g3ItsR85m6M6A&oh=00_AfWRuavCUi5mwt-c4Fm8wEOyf0lKEJ6Zmhd44EuXUQYhOQ&oe=68ADA3D0",
      video: "https://www.youtube.com/embed/c8aFcHFu8QM",
      deportista: {} as Deportista
    }
  ];

  ngOnInit(): void {
    //this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.publicacionService.obtenerPublicaciones().subscribe(data => {
      this.publicaciones = data;
    });
  }

}
