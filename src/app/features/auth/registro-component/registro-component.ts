import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Deportista } from '../../../shared/models/deportista.model';
import { Cazatalentos } from '../../../shared/models/cazatalentos.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent
],
  templateUrl: './registro-component.html',
  styleUrls: ['./registro-component.scss']
})
export class RegistroComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    celular: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required],
    tipoUsuario: ['', Validators.required],
    pais: ['', Validators.required],
    ciudad: ['', Validators.required],
    club: ['', Validators.required],
    fechaNacimiento: [''],
    tipo: [''],
    organizacionPertenece: [''],
    foto: [null, Validators.required]
  },
  { validators: this.passwordsMatchValidator } // 👈 validador a nivel de grupo
);
  submitted = false;
  fotoPreview: string | null = null;

    // ✅ Validador personalizado
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmarPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onFileChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result as string;
        this.form.patchValue({ foto: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    console.log(this.form);

    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.value;

    if (datos.tipoUsuario === 'deportista') {
      const deportista = {
        club: datos.club || '',
        //fechaNacimiento: datos.fechaNacimiento || '',
        foto: null,
        id: null,
        pais: datos.pais || '',
        ciudad: datos.ciudad || '',
        celular: datos.celular || 0,
        correo: datos.correo || '',
        nombre: datos.nombre || '',
        password: datos.password || '',
        tipoUsuario: 'deportista' as 'deportista',
      };
      const foto = datos.foto || null;
      this.authService.registrarDeportista(deportista, foto).subscribe({
        next: () => {
          alert('Registrado como deportista');
          this.router.navigate(['/login']);
        },
        error: (err) => alert('Error al registrar: ' + err.message)
      });
    } else if (datos.tipoUsuario === 'cazatalentos') {
      const cazatalentos: Cazatalentos = {
        id: 0,
        pais: datos.pais || '',
        ciudad: datos.ciudad || '',
        celular: datos.celular || 0,
        correo: datos.correo || '',
        nombre: datos.nombre || '',
        password: datos.password || '',
        tipoUsuario: 'cazatalentos' as 'cazatalentos',
        tipo: datos.tipo || '',
        organizacionPertenece: datos.organizacionPertenece || ''
      };
      const foto = this.form.get('foto')?.value;
      this.authService.registrarCazatalentos(cazatalentos, foto).subscribe({
        next: () => {
          alert('Registrado como cazatalentos');
          this.router.navigate(['/login']);
        },
        error: (err) => alert('Error al registrar: ' + err.message)
      });
    }
  }
}
