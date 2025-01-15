import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-contra',
  templateUrl: './modificar-contra.page.html',
  styleUrls: ['./modificar-contra.page.scss'],
  standalone: false,
})
export class ModificarContraPage implements OnInit {

  correo: string = "";
  contra: string = "";
  confirmarContra: string = "";

  errorCorreo: boolean = false;
  errorContra: boolean = false;
  errorContraVacio: boolean = false;
  errorConfirmarContra: boolean = false;

  mostrarRequisitos: boolean = false;

  constructor(private alertController: AlertController, private router: Router) { }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  esContraValida(): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=|\\{}[\]:;"'<>,.?/~`]).{8,}$/;
    return regex.test(this.contra);
  }

  // funcion para validar los campos
  validarRegistro() {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gmail\.cl|helppets\.cl|hotmail\.com)$/;


    // Validación del correo
    if (!this.correo.match(regexCorreo)) {
      this.errorCorreo = true;
    } else {
      this.errorCorreo = false;
    }

    //validacion campos vacios

    this.errorContraVacio = this.contra.trim() === '';

    // Validación de la confirmación de la contraseña
    if (this.contra !== this.confirmarContra) {
      this.errorConfirmarContra = true;
    } else {
      this.errorConfirmarContra = false;
    }

    if (
      !this.errorCorreo &&
      this.contra &&
      this.esContraValida() &&
      !this.errorConfirmarContra
    ) {
      this.presentAlert('Exitoso', 'se cambio la contraseña de manera correcta');
      this.router.navigate(['/cuenta'], {
        state: { password: this.contra },
      });
    }
  }


  ngOnInit() {
  }

}
