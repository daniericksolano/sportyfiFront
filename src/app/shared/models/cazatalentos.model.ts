import { Usuario } from "./usuario.model";

export interface Cazatalentos extends Usuario {
  tipo: string;
  organizacionPertenece: string;
}