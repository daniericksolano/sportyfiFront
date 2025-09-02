import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../../../../shared/models/publicacion.model';
import { environment } from '../../../../../environments/environment ';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private apiUrl = environment.apiUrl + "/publicacion"; // Cambiar por la URL real del backend

  constructor(private http: HttpClient) {}

  crearPublicacion(publicacion: Publicacion, foto: any): Observable<any> {
      const formData = new FormData();
      const publicacionData = {
        ...publicacion
      };
      formData.append('publicacion', JSON.stringify(publicacionData));
      formData.append('foto', foto);
    return this.http.post<Publicacion>(`${this.apiUrl}`, formData);
  }

  obtenerPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.apiUrl}`);
  }

  obtenerPublicacionPorId(id: number): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.apiUrl}/${id}`);
  }

  actualizarPublicacion(id: number, publicacion: Publicacion): Observable<Publicacion> {
    return this.http.put<Publicacion>(`${this.apiUrl}/${id}`, publicacion);
  }

  eliminarPublicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}