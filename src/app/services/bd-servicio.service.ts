import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Mascota } from './mascota';

@Injectable({
  providedIn: 'root'
})
export class BdServicioService {

  public database!: SQLiteObject;

  //tablas de la BD 
  //tabla rol
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(20) NOT NULL);";

  //tabla especie
  tablaEspecie: string = "CREATE TABLE IF NOT EXISTS especie(id_especie INTEGER PRIMARY KEY, nombre_especie VARCHAR(20) NOT NULL);";

  //tabla usuario
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, nombre_usuario VARCHAR(25) NOT NULL, apellido_usuario VARCHAR(25) NOT NULL, correo VARCHAR(50) NOT NULL,clave VARCHAR(16) NOT NULL, fecha_nac DATE NOT NULL, direccion VARCHAR(50) NOT NULL, id_rol INTEGER, FOREIGN KEY(id_rol) REFERENCES rol(id_rol));";

  //tabla mascota
  tablaMascota: string = "CREATE TABLE IF NOT EXISTS mascota(id_mascota INTEGER PRIMARY KEY autoincrement, nombre_mascota VARCHAR(20) NOT NULL, genero_mascota VARCHAR(10) NOT NULL, edad_mascota INTEGER NOT NULL, unidad_edad VARCHAR(4) NOT NULL, foto_mascota BLOB, id_especie INTEGER, FOREIGN KEY(id_especie) REFERENCES especie(id_especie));";

  //tabla vacunas 
  tablaVacunas: string = "CREATE TABLE IF NOT EXISTS vacunas(id_vacuna INTEGER PRIMARY KEY autoincrement, nombre_vacuna VARCHAR(40), fecha_vacunacion DATE, id_mascota INTEGER,FOREIGN KEY(id_mascota) REFERENCES mascota(id_mascota));";

  //tabla adopcion 
  tablaAdopcion: string = "CREATE TABLE IF NOT EXISTS adopcion(id_adopcion INTEGER PRIMARY KEY autoincrement, fecha_adopcion DATE, estatus BOOLEAN, id_ususario INTEGER, id_mascota INTEGER, FOREIGN KEY(id_usuario) REFERENCES usario(id_usuario),FOREIGN KEY(id_mascota) REFERENCES mascota(id_mascota));";

  //variables para insert principales o precargados
  //registro rol
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES(1,'administrador', (2, 'usuario normal');";

  //registro especie
  registroEspecie: string = "INSERT or IGNORE INTO especie(id_especie,nombre_especie) VALUES(1,'perro'), (2,'gato'), (3,'conejo');";

  //registro usuario
  registroUsuario: string = "INSERT or IGNORE INTO rol(id_usuario,nombre_usuario, apellido_usuario, correo, clave, fecha_nac, direccion, id_rol) VALUES(1,'jose','casas', 'Admin@helppets.cl', 'Admin.123456', '07/05/1999', 'La Serena 1073', 1);";

  //registro mascota
  registroMascota: string = "INSERT or IGNORE INTO mascota(nombre_mascota, edad_mascota, unidad_edad, id_especie) VALUES ('Waton', 2, 'años', 2);";

  //registro adopcion
  registroAdopcion: string = "INSERT or IGNORE INTO adopcion(fecha_adopcion, estatus, id_usuario, id_mascota) VALUES ('18/01/2025', 1, (SELECT id_usuario FROM usuario WHERE nombre_usuario = 'jose' AND apellido_usuario = 'casas'), (SELECT id_mascota FROM mascota WHERE nombre_mascota = 'Waton'));";

  //Hay que agregar las clases pero eso lo haremos en la clase del profe para que todo quede correcto
  //podemos crear una clase adopcion id_adopcion: number;fecha_adopcion: string;estatus: number; // 1 para "adoptada", 0 para "no adoptada"id_usuario: number;id_mascota: number;vacunas: Vacuna[];y ahi poner las vacunas para que se puedan entrelazar para el registro adopcion o tambien podemos alter table vacunas add column id_mascota integer; y luego crear la clase vacuna con estos datos id_vacuna: number;nombre_vacuna: string;fecha_vacunacion: string;id_mascota: number;id_adopcion: number; MUCHOS DATOSSSSSS

  //observables para manipular los select de mi BD
  listaUsuarios = new BehaviorSubject([]);
  //observables para manipular los select de mi BD
  listaMascotas = new BehaviorSubject([]);

  //observable del status de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertcontroller: AlertController) { 
    this.crearBD();
  }

  dbStatus(){
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuarios.asObservable();
  }

  fetchMascota(): Observable<Usuario[]>{
    return this.listaMascotas.asObservable();
  }


  async presentAlert(titulo: string, msj: string,) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      subHeader: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //funcion para crear la base de datos (en sqldeveloper seria crear nueva conexion)
  crearBD(){
    //verificar si la plataforma esta lista
    this.platform.ready().then(()=>{
      //crear una nueva base de datos o abrirla en el caso que exista
      this.sqlite.create({
        name: 'dbprueba.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        //si se creo correctamente se almacena la conexion en la funcion de flecha
        this.database = db;
        //se llama a la funcion que creara las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('error crear BD', JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try{
      //llamar a cada variable de tabla para ejecutarla en orden
      //tabla rol
      await this.database.executeSql(this.tablaRol, []);

      //tabla especie
      await this.database.executeSql(this.tablaEspecie, []);

      //tabla usuario
      await this.database.executeSql(this.tablaUsuario, []);

      //tabla mascota
      await this.database.executeSql(this.tablaMascota, []);

      //tabla vacunas
      await this.database.executeSql(this.tablaVacunas, []);

      //tablas adopcion
      await this.database.executeSql(this.tablaAdopcion, []);

      //llamar a las variables de los insert
      //registro rol
      await this.database.executeSql(this.registroRol, []);

      //registro especie
      await this.database.executeSql(this.registroEspecie, []);

      //registro usuario
      await this.database.executeSql(this.registroUsuario, []);

      //rellene el observable de usuarios
      //actualizo el status de la base de datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('error crear tablas', JSON.stringify(e));
    }
  }

  buscarUsuarios() {
    // Retorno del select de la BD en la tabla usuario
    this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      // Creo una lista vacía para almacenar los registros del cursor
      let items: Usuario[] = [];
      // Verificar si el cursor trae registros
      if (res.rows.length > 0) {
        // Ciclo para recorrer el cursor
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista vacía usando la clase Usuario
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            apellido_usuario: res.rows.item(i).apellido_usuario,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            fecha_nac: res.rows.item(i).fecha_nac,
            direccion: res.rows.item(i).direccion,
            id_rol: res.rows.item(i).id_rol

          })
        }
      }
      // Actualizar el observable
      this.listaUsuarios.next(items as any);
  
    }).catch(e => {
      this.presentAlert('error buscarUsuarios', JSON.stringify(e));
    });
  }

  buscarMascotas() {
    // Retorno del select de la BD en la tabla usuario
    this.database.executeSql('SELECT * FROM mascota', []).then(res => {
      // Creo una lista vacía para almacenar los registros del cursor
      let items: Mascota[] = [];
      // Verificar si el cursor trae registros
      if (res.rows.length > 0) {
        // Ciclo para recorrer el cursor
        for (var i = 0; i < res.rows.length; i++) {
          // Agrego los registros a mi lista vacía usando la clase Usuario
          items.push({
            id_mascota: res.rows.item(i).id_mascota,
            nombre_mascota: res.rows.item(i).nombre_mascota,
            genero_mascota: res.rows.item(i).genero_mascota,
            edad_mascota: res.rows.item(i).edad_mascota,
            unidad_edad: res.rows.item(i).unidad_edad,
            foto_mascota: res.rows.item(i).foto_mascota,
            id_especie: res.rows.item(i).id_especie
          })
        }
      }
      // Actualizar el observable
      this.listaMascotas.next(items as any);
  
    }).catch(e => {
      this.presentAlert('error buscarMascotas', JSON.stringify(e));
    });
  }
  
  


}


