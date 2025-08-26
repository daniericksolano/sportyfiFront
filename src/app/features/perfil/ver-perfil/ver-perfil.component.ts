import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../shared/service/perfil.service';
import { AuthService } from '../../../features/auth/service/auth-service';
import { Deportista } from '../../../shared/models/deportista.model';
import { Cazatalentos } from '../../../shared/models/cazatalentos.model';
import { FormBuilder } from '@angular/forms';
import { Perfil } from '../../../shared/models/perfil.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ver-perfil',
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.scss'
})
export class VerPerfilComponent implements OnInit {
  usuario: Deportista | Cazatalentos | null = null;
  tipoUsuario: 'deportista' | 'cazatalentos' | null = null;

  constructor(private perfilService: PerfilService, private authService: AuthService, private fb: FormBuilder) {
    let perfil: Perfil = JSON.parse(this.authService.obtenerToken()!);
    if(perfil.tipoUsuario == 'deportista') {
      this.perfilService.obtenerPerfilDeportista(perfil.id).subscribe({
        next: (data: Deportista) => {
          this.usuario = data;
          console.log(this.usuario.club);
        },
        error: (err) => {
          console.error('Error al obtener datos de deportista:', err);
          this.usuario = null;
        }
      });
    } else if(perfil.tipoUsuario == 'cazatalentos') {
      this.perfilService.obtenerPerfilCazatalentos(perfil.id).subscribe({
        next: (data: Cazatalentos) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al obtener datos de cazatalentos:', err);
          this.usuario = null;
        }
      });
    }
  }
  titulo() {
    if (!this.usuario) return 'Perfil';
    return this.usuario!.tipoUsuario === 'deportista' ? 'Deportista' : 'Cazatalentos';
  }

  ngOnInit(): void {
  }
  foto() {
    if (this.usuario?.tipoUsuario === 'deportista') {
      return ('data:image/png;base64,' + (this.usuario as Deportista).foto) || 'assets/default-avatar.png';
    }
    return 'assets/default-avatar.png';
  }
  club() {
    return this.usuario?.tipoUsuario === 'deportista' ? (this.usuario as Deportista).club : '';
  }
}
