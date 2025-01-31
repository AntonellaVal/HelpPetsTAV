import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-form-adopcion',
  templateUrl: './form-adopcion.page.html',
  styleUrls: ['./form-adopcion.page.scss'],
  standalone: false,
})
export class FormAdopcionPage implements OnInit {
  animales: any;
  id_usuario: number| null = null; // ID del usuario a modificar

  nombre_usuario: string = '';
  apellido_usuario: string = '';
  fecha_nac: string = '';
  telefono: string = '';
  direccion: string = '';
  id_mascota: number = 0;
  
  errorNombre: boolean = false;
  errorApellido: boolean = false;
  errorTelefono: boolean = false;

  constructor(private alertController: AlertController,  private router: Router, private bd: BdServicioService,) { 
    const navigation = this.router.getCurrentNavigation();
    this.animales =  navigation?.extras.state;
  }

  async presentAlert(titulo:string, mensaje:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
// Método para validar los campos
validarCampos() {
  this.errorNombre = this.nombre_usuario.length < 3 || this.nombre_usuario.length > 25;
  this.errorApellido = this.apellido_usuario.length < 3 || this.apellido_usuario.length > 25;
  this.errorTelefono = !/^(\+56\s)?9\d{8}$/.test(this.telefono); // Validación para el teléfono en formato chileno

  if (!this.errorNombre && !this.errorApellido && !this.errorTelefono) {
    // Si los campos son válidos, llamamos a la función para insertar la adopción
    this.insertarAdopcion();
  }
}

// Método para insertar adopción en la base de datos
async insertarAdopcion() {
// Llamamos al servicio para insertar el usuario en la base de datos

    // Ahora insertamos la adopción
    await this.bd.insertarAdopcion(this.nombre_usuario, this.apellido_usuario, this.fecha_nac,this.telefono, this.direccion, this.animales.id_mascota);

}

  async cancelarAdopcion() {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: '¿Está seguro de no querer continuar con la adopción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: async () => {
            const alertCorazon = await this.alertController.create({
              header: 'Adopción cancelada',
              message: '💔 Adopción cancelada.',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.router.navigate(['/animales-en-adopcion']); // Redirige a la página de animales en adopción
                  },
                },
              ],
            });
            await alertCorazon.present();
          },
        },
      ],
    });
    await alert.present();
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

}
