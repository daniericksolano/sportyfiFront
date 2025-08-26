import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrosMessageService {
  private errorMessages: ErrorMessageType[] = [
    { type: 'required', message: 'Este campo es obligatorio.' },
    { type: 'email', message: 'Por favor, ingrese un correo electrónico válido.' },
    { type: 'minlength', message: 'El valor es demasiado corto.' },
    { type: 'maxlength', message: 'El valor es demasiado largo.' },
    { type: 'pattern', message: 'El formato del valor no es válido.' },
    { type: 'passwordMismatch', message: 'Las contraseñas no coinciden.' },
    { type: 'invalidCredentials', message: 'Credenciales inválidas, por favor intente nuevamente.' },
    { type: 'serverError', message: 'Error del servidor, por favor intente más tarde.' },
    { type: 'passwordMismatch', message: 'Las contraseñas no coinciden.' }
  ];

  getErrorMessage(type: string): string {
    const error = this.errorMessages.find(error => error.type === type);
    return error ? error.message : 'Error desconocido';
  }
}

interface ErrorMessageType {
  type: string;
  message: string;
}