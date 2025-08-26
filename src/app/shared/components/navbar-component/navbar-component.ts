import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/service/auth-service';
import { PerfilService } from '../../../features/perfil/shared/service/perfil.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule, 
  ],
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.scss']
})
export class NavbarComponent {
    tipoUsuario: string | null = null;
    items: any[] = [];
    itemsAuth = [
      {
        label: 'Publicaciones',
        icon: 'bi-book',
        routerLink: '/publicaciones'
      },
      {
        label: 'Login',
        icon: 'bi-box-arrow-in-right',
        routerLink: '/login'
      },
      {
        label: 'Registro',
        icon: 'bi-person-plus',
        routerLink: '/registro'
      }
    ];
    itemsDeportista = [
      {
        label: 'Publicaciones',
        icon: 'bi-book',
        routerLink: '/publicaciones'
      },
      {
        label: 'Perfil',
        icon: 'bi-box-arrow-in-right',
        routerLink: '/perfil'
      }
    ];
    itemsCazatalentos = [
      {
        label: 'Publicaciones',
        icon: 'bi-book',
        routerLink: '/publicaciones'
      },
      {
        label: 'Perfil',
        icon: 'bi-box-arrow-in-right',
        routerLink: '/perfil'
      }
    ];
  constructor(private perfilService: PerfilService, private authService: AuthService) {
    this.tipoUsuario = this.perfilService.obtenerTipoUsuario();
    if (this.tipoUsuario === 'deportista') {
      this.items = this.itemsDeportista;
    } else if (this.tipoUsuario === 'cazatalentos') {
      this.items = this.itemsCazatalentos;
    } else {
      this.items = this.itemsAuth;
    }
  }
  logout() {
    // Lógica de logout
    this.authService.cerrarSesion();
  }
}
