import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {
  nombre:string="";
  apellido:string="";
  correo:string="";
  contra:string="";
  confirmarContra:string="";

  errorNombre: boolean = false;
  errorApellido: boolean = false;
  errorCorreo: boolean = false;
  errorContra: boolean = false;
  errorContraVacio: boolean = false;
  errorConfirmarContra: boolean = false;

  mostrarRequisitos: boolean = false;

  constructor(private alertController: AlertController,  private router: Router) { }
  
  async presentAlert(titulo:string, mensaje:string) {
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
    

    // Validación del nombre
    if (!this.nombre.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,25}$/)) {
      this.errorNombre = true;
    } else {
      this.errorNombre = false;
    }

    // Validación del apellido
    if (!this.apellido.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,25}$/)) {
      this.errorApellido = true;
    } else {
      this.errorApellido = false;
    }

    // Validación del correo
    if (!this.correo.match(regexCorreo)) {
      this.errorCorreo = true;
    } else {
      this.errorCorreo = false;
    }

    this.errorContraVacio = this.contra.trim() === '';

    // Validación de la confirmación de la contraseña
    if (this.contra !== this.confirmarContra) {
      this.errorConfirmarContra = true;
    } else {
      this.errorConfirmarContra = false;
    }

    if (
      !this.errorNombre &&
      !this.errorApellido &&
      !this.errorCorreo &&
      this.contra &&
      this.esContraValida() &&
      !this.errorConfirmarContra
    ) {
      this.presentAlert('Registro Exitoso', 'Ahora puedes iniciar sesión');
      this.router.navigate(['/login'], {
        state: { email: this.correo, password: this.contra },
      });
    }
  }

  ngOnInit() {
  }

}
