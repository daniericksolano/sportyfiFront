import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Deportista } from '../../../shared/models/deportista.model';
import { DomSanitizer } from '@angular/platform-browser';
import { PublicacionService } from '../shared/service/publicacion-service';

//style="width: 100%; max-width: 600px;"
@Component({
  selector: 'app-ver-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ver-publicacion.component.html'
})
export class VerPublicacionComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  publicacionService = inject(PublicacionService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  publicacion: any = {
        id: 1,
        titulo: "Lionel Messi",
        deporte: "Fútbol",
        posicionDeporte: "Delantero",
        descripcion: "Jugador argentino considerado uno de los mejores del mundo.",
        imagen: "https://scontent.fclo9-1.fna.fbcdn.net/v/t39.30808-6/475110431_122154113450339805_3961711523964111827_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGlI7_dGL0QfMqpmM_urMuVSuL8P-TlhoRK4vw_5OWGhAaOh6ClNqZR8OxoWMT0EnpLyey6uWAdvrpCkUs7ehYO&_nc_ohc=ktqavxkcymAQ7kNvwFxuxn5&_nc_oc=AdnvN4zp95c6eeWx7ROVOPq5tGJ7kXUomUSDnUoSX3owomPkuvJ56_o13UpOZsaAlPc&_nc_zt=23&_nc_ht=scontent.fclo9-1.fna&_nc_gid=TCG0fsdU5g3ItsR85m6M6A&oh=00_AfWRuavCUi5mwt-c4Fm8wEOyf0lKEJ6Zmhd44EuXUQYhOQ&oe=68ADA3D0",
        video: "https://www.youtube.com/watch?v=MxoiFqyuEaM",
        deportista: {} as Deportista
      };
  idPublicacion!: number;

  ngOnInit(): void {
    this.idPublicacion = Number(this.route.snapshot.paramMap.get('id'));
    /*this.publicacionService.obtenerPublicacionPorId(this.idPublicacion).subscribe(data => {
      this.publicacion = data;
    });*/
  }

  volver() {
    this.router.navigate(['/publicaciones']);
  }

  formatoVideoEmbed(url: string) {
    const videoId = url.split('v=')[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
