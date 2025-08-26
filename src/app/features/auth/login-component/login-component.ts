import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent
],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss']
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      tipoUsuario: ['', [Validators.required]]
    });
  }
 
  login(): void {
    this.submitted = true;
    console.log(this.form);
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        console.log(res);

        this.auth.guardarToken(JSON.stringify(res));
        const rol = res.tipoUsuario;

        // Redireccionar según el tipo de usuario
        if (rol === 'deportista') {
          this.router.navigate(['/deportista']);
        } else {
          this.router.navigate(['/cazatalentos']);
        }
      },
      error: () => {
        this.error = 'Credenciales inválidas';
      },
    });
  }

  getErrorMessage(controlName: string): string[] {
    if(this.form.get(controlName)?.errors) {
      return Object.keys(this.form.get(controlName)?.errors || {});
    }
    return [];
  }
        
}