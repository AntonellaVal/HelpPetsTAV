import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-modificar-cuenta',
  templateUrl: './modificar-cuenta.page.html',
  styleUrls: ['./modificar-cuenta.page.scss'],
  standalone: false,
})
export class ModificarCuentaPage implements OnInit {

  id_usuario: number| null = null; // ID del usuario a modificar
  nombre_usuario: string = ''; // Nombre del usuario
  apellido_usuario: string = ''; 

  // Variables para manejar errores
  errorNombre: string = '';
  errorApellido: string = '';

  constructor(private router: Router, private bd: BdServicioService) { 

  }
  ngOnInit() {
    // Obtener el ID del usuario desde el localStorage
    const idUsuario = localStorage.getItem('id_usuario');
    if (idUsuario) {
      this.id_usuario = parseInt(idUsuario, 10);

      // Buscar los datos del usuario para mostrarlos en el formulario
      this.bd.buscarUsuarios().then((usuarios) => {
        const usuario = usuarios.find((u) => u.id_usuario === this.id_usuario);
        if (usuario) {
          this.nombre_usuario = usuario.nombre_usuario;
          this.apellido_usuario = usuario.apellido_usuario;
        }
      }).catch(err => {
        console.error('Error al cargar los datos del usuario:', err);
      });
    } else {
      console.error('No se encontró el ID del usuario en el localStorage.');
    }
  }

  validarCampos() {
    this.errorNombre = '';
    this.errorApellido = '';

    if (this.nombre_usuario.trim().length < 3 || this.nombre_usuario.trim().length > 25) {
      this.errorNombre = 'El nombre debe tener entre 3 y 25 caracteres.';
    }

    if (this.apellido_usuario.trim().length < 3 || this.apellido_usuario.trim().length > 25) {
      this.errorApellido = 'El apellido debe tener entre 3 y 25 caracteres.';
    }

    return !this.errorNombre && !this.errorApellido;
  }

  actualizarPerfil() {
    if (this.id_usuario) {
      if (this.validarCampos()) {
        this.bd.updatePerfil(this.id_usuario, this.nombre_usuario, this.apellido_usuario);
        this.bd.buscarCuenta(this.id_usuario);
      }
    }
  }

  irPerfil(){
    this.router.navigate(['/perfil']); 
  }
}
