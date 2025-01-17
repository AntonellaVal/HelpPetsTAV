import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BdServicioService {

  public database!: SQLiteObject;

  //tablas de la BD 
  //tabla rol
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY, nombre_admin VARCHAR(20) NOT NULL);";

  //tabla especie
  tablaEspecie: string = "CREATE TABLE IF NOT EXISTS especie(id_especie INTEGER PRIMARY KEY, nombre_especie VARCHAR(20) NOT NULL);";

  //tabla usuario
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, nombre_usuario VARCHAR(25) NOT NULL, apellido_usuario VARCHAR(25) NOT NULL, correo VARCHAR(50) NOT NULL,clave VARCHAR(16) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(50) NOT NULL, id_rol INTEGER, FOREIGN KEY(id_rol) REFERENCES rol(id_rol));";

  //tabla mascota
  tablaMascota: string = "CREATE TABLE IF NOT EXISTS mascota(id_mascota INTEGER PRIMARY KEY autoincrement, nombre_mascota VARCHAR(20),genero_mascota VARCHAR(10),edad_mascota INTEGER, unidad_edad VARCHAR(4), foto_mascota BLOB, id_especie INTEGER, FOREIGN KEY(id_especie) REFERENCES especie(id_especie));";

  //tabla vacunas 
  tablaVacunas: string = "CREATE TABLE IF NOT EXISTS vacunas(id_vacuna INTEGER PRIMARY KEY autoincrement, nombre_vacuna VARCHAR(40), fecha_vacunacion DATE, id_mascota INTEGER,FOREIGN KEY(id_mascota) REFERENCES mascota(id_mascota));";

  //tabla adopcion 
  tablaAdopcion: string = "CREATE TABLE IF NOT EXISTS adopcion(id_adopcion INTEGER PRIMARY KEY autoincrement, fecha_adopcion DATE, estatus BOOLEAN, id_ususario INTEGER, id_mascota INTEGER, FOREIGN KEY(id_usuario) REFERENCES usario(id_usuario),FOREIGN KEY(id_mascota) REFERENCES mascota(id_mascota));";

  constructor(private sqlite: SQLite, private platform: Platform, private alertcontroller: AlertController) { }

  async presentAlert(titulo: string, msj: string,) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      subHeader: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }


}


