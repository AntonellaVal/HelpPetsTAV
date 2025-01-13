import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-animal',
  templateUrl: './agregar-animal.page.html',
  styleUrls: ['./agregar-animal.page.scss'],
  standalone: false,
})
export class AgregarAnimalPage implements OnInit {

  nombre: string = '';
  edad: number = 0;
  unidadEdad: string = 'días';
  especie: string = '';
  tieneVacunas: string = 'no';
  vacunas: string = '';
  errorEdad: boolean = false;
  errorEdadMessage: string = '';
  errorCamposVacios: boolean = false;
  errorNombreV: boolean = false;
  errorNombre: boolean = false;
  errorEdadCampo: boolean = false;
  errorEspecie: boolean = false;
  errorVacunas: boolean = false;

  constructor(private alertController: AlertController, private router: Router) { }

  async guardarAnimal() {
    if (this.validarCampos()) {
      // Guardar lógica aquí (podría ser enviar al backend)
      await this.presentAlert('Éxito', 'El animal ha sido creado correctamente.');
      this.router.navigate(['/principal-admin']); // Redirige a la página principal
    }
  }

  // Validación de campos
  validarCampos(): boolean {
    let esValido = true;

    // Resetear errores antes de validar
    this.errorNombreV = false;
    this.errorEdadCampo = false;
    this.errorEspecie = false;
    this.errorVacunas = false;
    this.errorCamposVacios = false;

    // Validación de campos vacíos
    if (!this.nombre) {
      this.errorNombreV = true;
      esValido = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nombre)) {
      this.errorNombre = true;
      esValido = false;
    }

    if (this.edad === 0 || !Number.isInteger(this.edad)) {  // Verificación si la edad es un número entero
      this.errorEdadCampo = true;
      esValido = false;
    }

    if (!this.especie) {
      this.errorEspecie = true;
      esValido = false;
    }

    if (this.tieneVacunas === '') {
      this.errorVacunas = true;
      esValido = false;
    }

    if (!this.nombre || !this.edad || !this.especie || this.tieneVacunas === '') {
      this.errorCamposVacios = true;
      esValido = false;
    }

    // Validación de la edad
    if (this.edad < 0) {
      this.errorEdad = true;
      this.errorEdadMessage = 'La edad no puede ser menor a 0.';
      esValido = false;
    } else if (this.unidadEdad === 'días' && this.edad > 31) {
      this.errorEdad = true;
      this.errorEdadMessage = 'Si la edad es mayor a 31 días, debe ser en meses.';
      esValido = false;
    } else if (this.unidadEdad === 'meses' && this.edad > 12) {
      this.errorEdad = true;
      this.errorEdadMessage = 'La edad no puede ser mayor a 12 meses.';
      esValido = false;
    } else if (this.unidadEdad === 'años' && (this.edad < 1 || this.edad > 38)) {
      this.errorEdad = true;
      this.errorEdadMessage = 'La edad en años debe estar entre 1 y 38 años.';
      esValido = false;
    } else {
      this.errorEdad = false;
    }

    return esValido;
  }

  // Función para mostrar la alerta
  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Función para cancelar la creación del animal
  async cancelarCreacion() {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: '¿Está seguro de que desea cancelar la creación del animal?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/principal-admin']);
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
