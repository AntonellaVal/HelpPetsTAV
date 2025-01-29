import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-modificar-contra',
  templateUrl: './modificar-contra.page.html',
  styleUrls: ['./modificar-contra.page.scss'],
  standalone: false,
})
export class ModificarContraPage implements OnInit {

  modContra: any;

  contraNueva: string = "";
  contra: string = "";
  confirmarContra: string = "";

  errorCorreo: boolean = false;
  errorContra: boolean = false;
  errorContraVacio: boolean = false;
  errorConfirmarContra: boolean = false;

  mostrarRequisitos: boolean = false;

  constructor(private alertController: AlertController, private router: Router, private bd: BdServicioService) { }

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

    //validacion campos vacios

    this.errorContraVacio = this.contra.trim() === '';

    // Validación de la confirmación de la contraseña
    if (this.contraNueva !== this.confirmarContra) {
      this.errorConfirmarContra = true;
    } else if(this.contra != this.modContra.clave){
        this.errorConfirmarContra = true;  
        this.presentAlert('Error', 'La contraseña actual no coincide');
    }else {
      this.errorConfirmarContra = false;
    }

    if (
      this.contraNueva &&
      this.esContraValida() &&
      !this.errorConfirmarContra
    ) {
      // Aquí llamamos al servicio para actualizar la contraseña
      try {
       this.bd.updateContra(this.modContra.id_usuario, this.contraNueva);
        //this.presentAlert('Exitoso', 'Se cambió la contraseña correctamente');
        //this.router.navigate(['/cuenta']);
      } catch (error) {
        this.presentAlert('Error', 'Hubo un problema al cambiar la contraseña.');
      }
    }
  }


  ngOnInit() {
    this.bd.dbStatus().subscribe(res=>{
      if(res){
        //suscribirnos al observable de la lista usuarios y rellenar mi variable propia
        this.bd.fetchCuenta().subscribe(data=>{
          //this.bd.presentAlert("aqui",data.toString());
          this.modContra = data[0];
          //this.bd.presentAlert("aqui2",this.modContra.clave);
        })
      }
    })
  }

}
