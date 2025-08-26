export interface Usuario {
  id: number | null;
  pais: string;
  ciudad: string;
  celular: number;
  correo: string;
  nombre: string;
  password: string;
  tipoUsuario: 'deportista' | 'cazatalentos';
}