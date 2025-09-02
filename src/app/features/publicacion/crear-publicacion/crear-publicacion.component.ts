import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PublicacionService } from '../shared/service/publicacion-service';
import { Publicacion } from '../../../shared/models/publicacion.model';
import { Deportista } from '../../../shared/models/deportista.model';
import { PerfilService } from '../../perfil/shared/service/perfil.service';

@Component({
  selector: 'app-crear-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-publicacion.component.html'
})
export class CrearPublicacionComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  publicacionService = inject(PublicacionService);
  perfilService = inject(PerfilService);

  form: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    deporte: ['', Validators.required],
    posicionDeporte: ['', Validators.required],
    descripcion: ['', Validators.required],
    video: [''],
    imagen: [null]
  });

  imagenPreview: string | ArrayBuffer | null = null;

  onImageSelect(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.form.get('imagen')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.form.invalid) return;
    const datos = this.form.value;
    let publicacion: Publicacion = {
      id: 0,
      titulo: datos.titulo,
      deporte: datos.deporte,
      posicionDeporte: datos.posicionDeporte,
      descripcion: datos.descripcion,
      video: datos.video,
      imagen: '', // La imagen se maneja por separado
      deportista: {
        id: this.perfilService.obtenerIdUsuario()
      } as Deportista // Aquí deberías asignar el deportista actual
    };
    this.publicacionService.crearPublicacion(publicacion, datos.imagen).subscribe((resp) => {
      console.log('Publicación creada:', resp);
      this.router.navigate(['/publicaciones']);
    });
  }
}
