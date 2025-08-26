import { Deportista } from './deportista.model';

export interface Publicacion {
  id: number;
  deporte: string;
  titulo: string;
  posicionDeporte: string;
  descripcion: string;
  video: string;    // URL del video
  imagen: string;    // URL de la imagen
  deportista: Deportista;
}