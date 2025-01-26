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

  nombre_usuario: string = '';
  apellido_usuario: string = '';
  fecha_nac: string = '';
  telefono: string = '';
  direccion: string = '';
  
  errorNombre: boolean = false;
  errorApellido: boolean = false;
  errorTelefono: boolean = false;

  constructor(private alertController: AlertController,  private router: Router, private bd: BdServicioService,) { }

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
    await this.bd.insertarAdopcion(this.nombre_usuario, this.apellido_usuario, this.fecha_nac, this.telefono, this.direccion);

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
  }

}
