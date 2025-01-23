import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Mascota } from './mascota';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BdServicioService {

  public database!: SQLiteObject;

  //tablas de la BD 
  //tabla rol
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY autoincrement, nombre_rol VARCHAR(20) NOT NULL);";

  //tabla especie
  tablaEspecie: string = "CREATE TABLE IF NOT EXISTS especie(id_especie INTEGER PRIMARY KEY autoincrement, nombre_especie VARCHAR(20) NOT NULL);";

  //tabla usuario
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuarios(id_usuario INTEGER PRIMARY KEY autoincrement, nombre_usuario VARCHAR(25) NOT NULL, apellido_usuario VARCHAR(25) NOT NULL, correo VARCHAR(50) NOT NULL,clave VARCHAR(16) NOT NULL, fecha_nac INEGER, direccion VARCHAR(50) , telefono VARCHAR(9), id_rol INTEGER, FOREIGN KEY(id_rol) REFERENCES rol(id_rol));";

  //tabla mascota
  tablaMascotas: string = "CREATE TABLE IF NOT EXISTS mascotas(id_mascota INTEGER PRIMARY KEY autoincrement, nombre_mascota VARCHAR(20) NOT NULL, genero_mascota VARCHAR(10) NOT NULL, edad_mascota INTEGER NOT NULL, unidad_edad VARCHAR(4) NOT NULL, foto_mascota BLOB, vacunas VARCHAR(2) NOT NULL, detalle_vacuna VARCHAR(250), id_especie INTEGER, FOREIGN KEY(id_especie) REFERENCES especie(id_especie));";

  //tabla adopcion 
  tablaAdopcion: string = "CREATE TABLE IF NOT EXISTS adopcion(id_adopcion INTEGER PRIMARY KEY autoincrement, fecha_adopcion DATE, estatus BOOLEAN, id_usuario INTEGER, id_mascota INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),FOREIGN KEY(id_mascota) REFERENCES mascota(id_mascota));";

  //variables para insert principales o precargados
  //registro rol
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES(1,'administrador'), (2, 'usuario normal');";

  //registro especie
  registroEspecie: string = "INSERT or IGNORE INTO especie(id_especie,nombre_especie) VALUES(1,'perro'), (2,'gato'), (3,'conejo');";

  //registro usuario
  registroUsuario: string = "INSERT or IGNORE INTO usuarios(id_usuario,nombre_usuario, apellido_usuario, correo, clave, fecha_nac, direccion, id_rol) VALUES(1,'jose','casas', 'admin@helppets.cl', 'Admin.123456', '07/05/1999', 'La Serena 1073', 1);";

  //registro mascota
  registroMascota: string = "INSERT or IGNORE INTO mascota(nombre_mascota, edad_mascota, unidad_edad, id_especie) VALUES ('Waton', 2, 'años', 2);";

  //registro adopcion
  registroAdopcion: string = "INSERT or IGNORE INTO adopcion(fecha_adopcion, estatus, id_usuario, id_mascota) VALUES ('18/01/2025', 1, (SELECT id_usuario FROM usuarios WHERE nombre_usuario = 'jose' AND apellido_usuario = 'casas'), (SELECT id_mascota FROM mascota WHERE nombre_mascota = 'Waton'));";

  //Hay que agregar las clases pero eso lo haremos en la clase del profe para que todo quede correcto
  //podemos crear una clase adopcion id_adopcion: number;fecha_adopcion: string;estatus: number; // 1 para "adoptada", 0 para "no adoptada"id_usuario: number;id_mascota: number;vacunas: Vacuna[];y ahi poner las vacunas para que se puedan entrelazar para el registro adopcion o tambien podemos alter table vacunas add column id_mascota integer; y luego crear la clase vacuna con estos datos id_vacuna: number;nombre_vacuna: string;fecha_vacunacion: string;id_mascota: number;id_adopcion: number; MUCHOS DATOSSSSSS

  //observables para manipular los select de mi BD
  listaUsuarios = new BehaviorSubject([]);
  //observables para manipular los select de mi BD
  listaMascotas = new BehaviorSubject([]);

  //observable del status de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertcontroller: AlertController, private router: Router) { 
    this.crearBD();
  }

  dbStatus(){
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuarios.asObservable();
  }

  fetchMascota(): Observable<Mascota[]>{
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
      await this.database.executeSql(this.tablaUsuarios, []);

      //tabla mascota
      await this.database.executeSql(this.tablaMascotas, []);

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
      this.buscarUsuarios();
      //actualizo el status de la base de datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('error crear tablas', JSON.stringify(e));
    }
  }

  buscarUsuarios(): Promise<Usuario[]> {
    return new Promise((resolve, reject) => {
      // Ejecutar la consulta en la base de datos
      this.database.executeSql('SELECT * FROM usuarios', [])
        .then(res => {
          let items: Usuario[] = []; // Lista vacía para almacenar los registros del cursor
  
          // Verificar si el cursor trae registros
          if (res.rows.length > 0) {
            // Ciclo para recorrer el cursor y llenar la lista
            for (let i = 0; i < res.rows.length; i++) {
              items.push({
                id_usuario: res.rows.item(i).id_usuario,
                nombre_usuario: res.rows.item(i).nombre_usuario,
                apellido_usuario: res.rows.item(i).apellido_usuario,
                correo: res.rows.item(i).correo,
                clave: res.rows.item(i).clave,
                fecha_nac: res.rows.item(i).fecha_nac,
                direccion: res.rows.item(i).direccion,
                id_rol: res.rows.item(i).id_rol
              });
            }
          }
  
          resolve(items); // Resuelve la Promise con los usuarios encontrados
        })
        .catch(err => {
          console.error('Error al ejecutar la consulta de usuarios', err);
          reject(err); // Rechaza la Promise en caso de error
        });
    });
  }

  buscarMascotas() {
    // Retorno del select de la BD en la tabla usuario
    this.database.executeSql('SELECT m.id_mascota, m.nombre_mascota, m.genero_mascota, m.edad_mascota, m.unidad_edad, m.foto_mascota, m.vacunas, m.detalle_vacuna, e.nombre_especie FROM mascotas m INNER JOIN especie e ON m.id_especie = e.id_especie', []).then(res => {
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
            vacunas: res.rows.item(i).vacunas,
            detalle_vacuna: res.rows.item(i).detalle_vacuna,
            especie:res.rows.item(i).nombre_especie
          })
        }
      }
      // Actualizar el observable
      this.listaMascotas.next(items as any);
  
    }).catch(e => {
      this.presentAlert('error buscarMascotas', JSON.stringify(e));
    });
  }
  
  //funcion para insertar usuarios 
  insertarUsuario(nombre_usuario:string, apellido_usuario:string,correo: string, clave: string){
   // Asignamos el id_rol como 2 para el rol de usuario normal
  const idRol = 2; 

  // Realizamos el insert en la base de datos para registrar al nuevo usuario
  this.database.executeSql(
    'INSERT INTO usuarios(nombre_usuario, apellido_usuario, correo, clave, id_rol) VALUES(?, ?, ?, ?, ?)',
    [nombre_usuario, apellido_usuario, correo, clave, idRol]
  ).then(res => {
    // Mostrar un mensaje de confirmación
    this.presentAlert('Registro', 'Usuario registrado correctamente');
    
    // Actualizar el observable de usuarios
    this.buscarUsuarios();

    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }).catch(e => {
    // Mostrar un mensaje de error si ocurre un problema
    this.presentAlert('Error', 'No se pudo registrar el usuario');
    console.error(e);
  });

  }

  //funcion ara insertar mascota
  insertarMascota( nombre: string,
    genero: string,
    edad: number,
    unidadEdad: string,
    foto: any,
    tieneVacunas: string,
    vacunas: string,
    idEspecie: number // Recibe el ID de la especie
  ) {
    this.database.executeSql(
      `INSERT INTO mascotas (nombre_mascota, genero_mascota, edad_mascota, unidad_edad, foto_mascota, vacunas, detalle_vacuna, id_especie) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, genero, edad, unidadEdad, foto, tieneVacunas, vacunas, idEspecie]
    )
      .then(() => {
        this.presentAlert('Éxito', 'Mascota registrada correctamente.');
        //actualizar el observble de mascotas
        this.buscarMascotas();

        this.router.navigate(['/principal-admin']);
      })
      .catch((err) => {
        console.error(err);
        this.presentAlert('Error', 'No se pudo registrar la mascota.');
      });
  }
  


}


