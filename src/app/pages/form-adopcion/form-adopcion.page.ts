import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-adopcion',
  templateUrl: './form-adopcion.page.html',
  styleUrls: ['./form-adopcion.page.scss'],
  standalone: false,
})
export class FormAdopcionPage implements OnInit {

  nombre: string = " ";
  apellido: string = " ";
  edad: number = 0;
  telefono: string = " ";
  fecha: string = " ";
  horaSeleccionada: string = '';

  horasDisponibles: string[] = ['10:00', '11:00', '12:00', '15:00', '16:00'];

  errorNombre: boolean = false;
  errorApellido: boolean = false;
  errorEdad: boolean = false;
  errorTelefono: boolean = false;
  errorFecha: boolean = false;
  errorHora: boolean = false;

  constructor(private alertController: AlertController,  private router: Router) { }

  async presentAlert(titulo:string, mensaje:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  validarCampos(){
    const hoy = new Date().toISOString().split('T')[0];

    let correcto = true;

    // Validación del nombre
    if (!this.nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,25}$/)) {
      this.errorNombre = true;
      correcto = false;
    } else {
      this.errorNombre = false;
    }

    // Validación del apellido
    if (!this.apellido.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,25}$/)) {
      this.errorApellido = true;
      correcto = false;
    } else {
      this.errorApellido = false;
    }

    // Validación de la edad (mayor de edad)
    if (this.edad < 18) {
      this.errorEdad = true;
      correcto = false;
    } else {
      this.errorEdad = false;
    }

    // Validación del teléfono (debe comenzar con 9 y tener 9 dígitos)
    if (!this.telefono || !/^[9]\d{8}$/.test(this.telefono.toString())) {
      this.errorTelefono = true;
      correcto = false;
    } else {
      this.errorTelefono = false;
    }

    // Validación de la fecha (no puede ser anterior a hoy)
    if (!this.fecha || this.fecha < hoy) {
      this.errorFecha = true;
      correcto = false;
    } else {
      this.errorFecha = false;
    }

    // Validación de la hora seleccionada
    if (!this.horaSeleccionada) {
      this.errorHora = true;
      correcto = false;
    } else {
      this.errorHora = false;
    }

    // Verificación final
    if (correcto) {
      this.presentAlert('Éxito', 'Formulario válido. ¡Gracias por completar la adopción!');
      this.router.navigate(['/animales-en-adopcion']); // Redirige a la página de animales en adopción
    }
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
