export interface RespuestaLogin {
  token: string;
  tipoUsuario: 'deportista' | 'cazatalentos';
  idUsuario: string;
  nombre: string;
}