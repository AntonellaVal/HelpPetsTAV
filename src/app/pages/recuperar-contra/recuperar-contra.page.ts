import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
  standalone: false,
})
export class RecuperarContraPage implements OnInit {

  pregunta: string = '';
  respuesta: string = '';
  clave: string = '';
  
  constructor(private bd: BdServicioService, private alertController: AlertController, private router: Router) { }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async buscarContrasena(){
   await this.bd.recuperarContra(this.respuesta, this.pregunta).then(res=>{
    this.clave = res;
   })
   this.presentAlert("Su contraseña es: ",this.clave)
  }

  IrLogin(){
    this.router.navigate(['/login'])
  }

  ngOnInit() {
  }

}
