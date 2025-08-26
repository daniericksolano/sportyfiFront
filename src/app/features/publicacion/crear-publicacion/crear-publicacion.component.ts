import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PublicacionService } from '../shared/service/publicacion-service';

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
    this.publicacionService.crearPublicacion(datos).subscribe(() => {
      this.router.navigate(['/publicaciones']);
    });
  }
}
