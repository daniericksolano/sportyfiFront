import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../shared/service/publicacion-service';

@Component({
  selector: 'app-editar-publicacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-publicacion.component.html'
})
export class EditarPublicacionComponent implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
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
  idPublicacion!: number;

  ngOnInit(): void {
    this.idPublicacion = Number(this.route.snapshot.paramMap.get('id'));
    this.publicacionService.obtenerPublicacionPorId(this.idPublicacion).subscribe(data => {
      this.form.patchValue({
        titulo: data.titulo,
        deporte: data.deporte,
        posicionDeporte: data.posicionDeporte,
        descripcion: data.descripcion,
        video: data.video
      });
      this.imagenPreview = data.imagen;
    });
  }

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
    const data = this.form.value;
    this.publicacionService.actualizarPublicacion(this.idPublicacion, data).subscribe(() => {
      this.router.navigate(['/publicaciones']);
    });
  }
}
