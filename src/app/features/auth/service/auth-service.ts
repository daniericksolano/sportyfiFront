import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../../shared/models/login.model';
import { Deportista } from '../../../shared/models/deportista.model';
import { Cazatalentos } from '../../../shared/models/cazatalentos.model';
import { RespuestaLogin } from '../../../shared/models/respuesta-login.model';
import { environment } from '../../../../environments/environment ';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl; // Cambia por tu endpoint real
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  // 🔐 Login
  login(credenciales: Login): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${this.API_URL}/auth/${credenciales.tipoUsuario}`, credenciales);
  }

  // 📝 Registro de deportista con foto (multipart/form-data)
  registrarDeportista(deportista: Deportista, foto: any): Observable<any> {
    const formData = new FormData();
    const desportistaData = {
      ...deportista
    };
    formData.append('deportista', JSON.stringify(desportistaData));
    formData.append('foto', foto);
    return this.http.post(`${this.API_URL}/deportista`, formData);
  }

  // 📝 Registro de cazatalentos con foto (multipart/form-data)
  registrarCazatalentos(cazatalentos: Cazatalentos, foto?: any): Observable<any> {
    const formData = new FormData();
    formData.append('cazatalentos', JSON.stringify(cazatalentos));
    if (foto) {
      formData.append('foto', foto);
    }
    return this.http.post(`${this.API_URL}/registro/cazatalentos`, formData);
  }

  // 💾 Guardar token
  guardarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // 📤 Obtener token
  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // 🧠 Decodificar el JWT (si no usas una librería, esto es una forma simple)
  obtenerDatosUsuario(): any | null {
    const token = this.obtenerToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    //const decodedPayload = atob(payload);
    //return JSON.parse(decodedPayload);
  }

  // ✅ Saber si está autenticado
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  // 🚪 Logout
  cerrarSesion(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // 🎭 Obtener rol
  obtenerRol(): 'deportista' | 'cazatalentos' | null {
    const datos = this.obtenerDatosUsuario();
    return datos?.tipoUsuario || null;
  }
}
