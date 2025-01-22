import { Component, OnInit } from '@angular/core';
import { ApiservicioService } from 'src/app/services/apiservicio.service';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-animales-adoptados-api',
  templateUrl: './animales-adoptados-api.page.html',
  styleUrls: ['./animales-adoptados-api.page.scss'],
  standalone: false,
})
export class AnimalesAdoptadosApiPage implements OnInit {

  posts: any;
  constructor(private api: ApiservicioService, private alertController: AlertController) { }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Función para verificar el estado actual de la red
  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    console.log('Network status:', status);

    if (!status.connected) {
      // Si no está conectado, mostramos el alerta
      this.presentAlert('Sin Conexión', 'No hay conexión a Internet');
    } else {
      // Si está conectado, hacemos la solicitud a la API
      this.api.obtenerPosts().subscribe(res => {
        console.log(res.data);
        this.posts = res.data;
      }, err => {
        console.error('Error al obtener los posts', err);
        this.presentAlert('Error', 'Ocurrió un error al obtener los datos.');
      });
    }
  };

  ngOnInit() {
    this.logCurrentNetworkStatus();
  }

  

}
