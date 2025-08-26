import { Usuario } from "./usuario.model";

export interface Deportista extends Usuario {
  club: string;
  foto: any; // Base64
  //fechaNacimiento: string;
}