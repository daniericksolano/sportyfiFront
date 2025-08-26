import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment ';
import { HttpClient } from '@angular/common/http';
import { Deportista } from '../../../../shared/models/deportista.model';
import { Observable } from 'rxjs';
import { Cazatalentos } from '../../../../shared/models/cazatalentos.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiDeportista = environment.apiUrl + "/deportista"; // Cambiar por la URL real del backend
  private apiCazatalentos = environment.apiUrl + "/cazatalentos"; // Cambiar por la URL real del backend

  constructor(private http: HttpClient) {}

  obtenerPerfilDeportista(id: number): Observable<Deportista> {
    return this.http.get<Deportista>(`${this.apiDeportista}/${id}`);
  }

  obtenerPerfilCazatalentos(id: number): Observable<Cazatalentos> {
    return this.http.get<Cazatalentos>(`${this.apiCazatalentos}/${id}`);
  }
  
  obtenerTipoUsuario(): any | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(token).tipoUsuario;
  }
}
