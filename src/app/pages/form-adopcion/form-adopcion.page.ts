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

 // Campos obligatorios para la adopción
 nombreUsuario: string = '';
 apellidoUsuario: string = '';
 fechaNac: string = '';
 telefono: string = '';
 direccion: string = '';
 idMascota: number = 0;
 fechaAdopcion: string = '';
 estatus: string = 'adoptado'; // Por defecto, la mascota pasa a "adoptado" cuando se registra la adopción

 // Flags para mostrar errores
 errorNombre: boolean = false;
 errorApellido: boolean = false;
 errorFechaNac: boolean = false;
 errorTelefono: boolean = false;
 errorDireccion: boolean = false;
 errorMascota: boolean = false;

 constructor(
   private alertController: AlertController,
   private router: Router,
   private bd: BdServicioService
 ) {}

 async presentAlert(titulo: string, mensaje: string) {
   const alert = await this.alertController.create({
     header: titulo,
     message: mensaje,
     buttons: ['OK'],
   });
   await alert.present();
 }

 // Validar los campos obligatorios
 validarAdopcion() {
   // Validación del nombre del usuario
   if (!this.nombreUsuario.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,25}$/)) {
     this.errorNombre = true;
   } else {
     this.errorNombre = false;
   }

   // Validación del apellido del usuario
   if (!this.apellidoUsuario.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,25}$/)) {
     this.errorApellido = true;
   } else {
     this.errorApellido = false;
   }

   // Validación de la fecha de nacimiento
   if (!this.fechaNac) {
     this.errorFechaNac = true;
   } else {
     this.errorFechaNac = false;
   }

   // Validación del teléfono
   if (!this.telefono.match(/^\d{9,10}$/)) {
     this.errorTelefono = true;
   } else {
     this.errorTelefono = false;
   }

   // Validación de la dirección
   if (this.direccion.trim().length < 5) {
     this.errorDireccion = true;
   } else {
     this.errorDireccion = false;
   }

   // Validación del ID de la mascota
   if (this.idMascota <= 0) {
     this.errorMascota = true;
   } else {
     this.errorMascota = false;
   }

   // Si no hay errores, insertar la adopción
   if (
     !this.errorNombre &&
     !this.errorApellido &&
     !this.errorFechaNac &&
     !this.errorTelefono &&
     !this.errorDireccion &&
     !this.errorMascota
   ) {
     this.insertarAdopcion();
   }
 }

 // Insertar adopción
 insertarAdopcion() {
   const idUsuario = 1; // Aquí debes usar el ID del usuario autenticado
   this.bd
     .insertarAdopcion(
       idUsuario,
       this.idMascota,
       this.fechaAdopcion,
       this.estatus,
       this.nombreUsuario,
       this.apellidoUsuario,
       this.fechaNac,
       this.telefono,
       this.direccion
     )
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
