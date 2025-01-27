import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Mascota } from './mascota';
import { Router } from '@angular/router';
import { Adopcion } from './adopcion';

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
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuarios(id_usuario INTEGER PRIMARY KEY autoincrement, nombre_usuario VARCHAR(25) NOT NULL, apellido_usuario VARCHAR(25) NOT NULL, correo VARCHAR(50) NOT NULL,clave VARCHAR(16) NOT NULL, fecha_nac VARCHAR(10), direccion VARCHAR(50) , telefono VARCHAR(9), id_rol INTEGER, FOREIGN KEY(id_rol) REFERENCES rol(id_rol));";

  //tabla mascota
  tablaMascotas: string = "CREATE TABLE IF NOT EXISTS mascotas(id_mascota INTEGER PRIMARY KEY autoincrement, nombre_mascota VARCHAR(20) NOT NULL, genero_mascota VARCHAR(10) NOT NULL, edad_mascota INTEGER NOT NULL, unidad_edad VARCHAR(4) NOT NULL, foto_mascota BLOB, vacunas VARCHAR(2) NOT NULL, detalle_vacuna VARCHAR(250), id_especie INTEGER, FOREIGN KEY(id_especie) REFERENCES especie(id_especie));";

  //tabla adopcion 
  tablaAdopcions: string = "CREATE TABLE IF NOT EXISTS tadopciones(id_adopcion INTEGER PRIMARY KEY autoincrement, fecha_adopcion VARCHAR(10), estatus BOOLEAN, id_usuario INTEGER, id_mascota INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),FOREIGN KEY(id_mascota) REFERENCES mascota(id_mascota));";

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

  //observables para manipular los select de mi BD
  listaCuenta = new BehaviorSubject([]);

  //observables para manipular los select de mi BD
  listaAdopcion = new BehaviorSubject([]);

  //observable del status de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertcontroller: AlertController, private router: Router) {
    this.crearBD();
  }

  dbStatus() {
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  fetchMascota(): Observable<Mascota[]> {
    return this.listaMascotas.asObservable();
  }

  fetchCuenta(): Observable<Usuario[]> {
    return this.listaCuenta.asObservable();
  }

  fetchAdopcion(): Observable<Usuario[]> {
    return this.listaAdopcion.asObservable();
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
  crearBD() {
    //verificar si la plataforma esta lista
    this.platform.ready().then(() => {
      //crear una nueva base de datos o abrirla en el caso que exista
      this.sqlite.create({
        name: 'dbprueba.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //si se creo correctamente se almacena la conexion en la funcion de flecha
        this.database = db;
        //se llama a la funcion que creara las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('error crear BD', JSON.stringify(e));
      })
    })
  }

  async crearTablas() {
    try {
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
      await this.database.executeSql(this.tablaAdopcions, []);

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

    } catch (e) {
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

  buscarCuenta(id_usuario: number) {
    // Realizamos la consulta a la base de datos
    this.database.executeSql('SELECT nombre_usuario, apellido_usuario, correo FROM usuarios WHERE id_usuario = ?', [id_usuario])
      .then(res => {
        let items: Usuario[] = [];
        // Creo una lista vacía para almacenar los registros del cursor
        if (res.rows.length > 0) {
          // Verificar si el cursor trae registros
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
        this.listaCuenta.next(items as any);
      }).catch(e => {
        this.presentAlert('error buscarCuenta', JSON.stringify(e));
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
            especie: res.rows.item(i).nombre_especie
          })
        }
      }
      // Actualizar el observable
      this.listaMascotas.next(items as any);

    }).catch(e => {
      this.presentAlert('error buscarMascotas', JSON.stringify(e));
    });
  }

  //funcion para buscar todos los registros de la tabla adopcion
  buscarAdopcion() {
    this.database.executeSql(
      `SELECT u.nombre_usuario, u.apellido_usuario, u.fecha_nac, u.telefono, u.direccion, a.fecha_adopcion, a.estatus, a.id_adopcion, m.id_mascota, m.nombre_mascota FROM usuarios u INNER JOIN tadopciones a ON u.id_usuario = a.id_usuario INNER JOIN mascotas m ON m.id_mascota = a.id_mascota`, []).then(res => {
        let items: Adopcion[] = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              usuario_nombre: res.rows.item(i).nombre_usuario,
              usuario_apellido: res.rows.item(i).apellido_usuario,
              fecha_nac: res.rows.item(i).fecha_nac,
              telefono: res.rows.item(i).telefono,
              direccion: res.rows.item(i).direccion,
              fecha_adopcion: res.rows.item(i).fecha_adopcion,
              estatus: res.rows.item(i).estatus,
              id_adopcion: res.rows.item(i).id_adopcion,
              id_mascota: res.rows.item(i).id_mascota,
              mascota_nombre: res.rows.item(i).nombre_mascota
            });
          }
        }
        this.listaAdopcion.next(items as any);
      }).catch(e => {
        this.presentAlert('Error buscarAdopcion', JSON.stringify(e));
      });
  }


  //funcion para insertar usuarios 
  insertarUsuario(nombre_usuario: string, apellido_usuario: string, correo: string, clave: string) {
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

  //funcion para insertar mascota
  insertarMascota(nombre: string, genero: string, edad: number, unidadEdad: string, foto: any, tieneVacunas: string, vacunas: string, idEspecie: number // Recibe el ID de la especie
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


  insertarAdopcion(nombre_usuario: string, apellido_usuario: string, fecha_nac: string, telefono: string, direccion: string, id_mascota: number) {
    // Se busca el usuario en la base de datos para obtener su id
    this.database.executeSql(
      'SELECT id_usuario,fecha_nac telefono, direccion FROM usuarios WHERE nombre_usuario = ? AND apellido_usuario = ?',
      [nombre_usuario, apellido_usuario]
    ).then((res) => {
      if (res.rows.length > 0) {
        const id_usuario = res.rows.item(0).id_usuario;  // Obtenemos el ID del usuario
        // Ahora, actualizamos los campos de teléfono y dirección en la tabla usuarios
        this.database.executeSql(
          'UPDATE usuarios SET telefono = ?, direccion = ? WHERE id_usuario = ?',
          [telefono, direccion, id_usuario]
        ).then(() => {
          // Ahora insertamos la adopción en la tabla tadopciones
          this.database.executeSql(
            'INSERT INTO tadopciones(fecha_adopcion, estatus, id_usuario, id_mascota) VALUES(?, 1, ?, ?)',
            [fecha_nac, id_usuario, id_mascota]
          ).then(() => {
            // Mensaje de éxito
            this.presentAlert('Adopción Exitosa', 'Tu adopción ha sido registrada.');
            this.router.navigate(['/animales-en-adopcion']);
            // Aquí debes actualizar el observable `buscarAdopcion`
            this.buscarAdopcion(); // Asumiendo que buscarAdopcion es un método que actualiza el observable.
            this.actualizarEstatusMascota(id_mascota);
          }).catch((err) => {
            this.presentAlert('Error al registrar adopción', 'Hubo un problema al registrar tu adopción.');
            console.error(err);
          });
        }).catch((err) => {
          this.presentAlert('Error al actualizar usuario', 'Hubo un problema al actualizar los datos del usuario.');
          console.error(err);
        });
      } else {
        this.presentAlert('Error', 'Usuario no encontrado.');
      }
    }).catch((err) => {
      console.error('Error al buscar el usuario:', err);
    });
  }

  actualizarEstatusMascota(id_mascota: number): Promise<boolean> {
    return this.database.executeSql(
      'SELECT estatus FROM tadopciones WHERE id_mascota = ? AND estatus = 1',
      [id_mascota]
    ).then((res) => {
      // Si hay registros con estatus = 1, significa que está adoptada
      return res.rows.length > 0;
    }).catch((err) => {
      console.error('Error al verificar el estatus de adopción:', err);
      throw err; // Propagamos el error para manejarlo en el componente si es necesario
    });
  }

  updateMascota(nombre: string, genero: string, edad: number, unidadEdad: string, foto: any, tieneVacunas: string, vacunas: string, id_mascota: number, nombreEspecie: string) {
    // Primero obtener el id_especie de la especie seleccionada
    this.database.executeSql('SELECT id_especie FROM especie WHERE nombre_especie = ?', [nombreEspecie]).then(res => {
      if (res.rows.length > 0) {
        // Si encontramos la especie, obtenemos su id
        let id_especie = res.rows.item(0).id_especie;

        // Ahora podemos actualizar la mascota con el id_especie obtenido
        this.database.executeSql('UPDATE mascotas SET nombre_mascota =?, genero_mascota =?, edad_mascota =?, unidad_edad =?, foto_mascota =?, vacunas =?, detalle_vacuna =?, id_especie =? WHERE id_mascota =?',
          [nombre, genero, edad, unidadEdad, foto, tieneVacunas, vacunas, id_especie, id_mascota]).then(res => {
            this.presentAlert('Actualizar', 'Usuario modificado correctamente');
            // Actualizar el observable
            this.buscarMascotas();
            // Redireccionar
            this.router.navigate(['/modificar-eliminar-animal']);
          }).catch(e => {
            this.presentAlert('Error en updateMascota', JSON.stringify(e));
          });
      } else {
        this.presentAlert('Error', 'Especie no encontrada');
      }
    }).catch(e => {
      this.presentAlert('Error al obtener especie', JSON.stringify(e));
    });
  }

  eliminarMascota(id: number) {
    this.database.executeSql('DELETE FROM mascotas WHERE id_mascota = ?', [id]).then(res => {
      this.presentAlert('Eliminar', 'mascota eliminada correctamente');
      //actualizar el observable
      this.buscarMascotas();
    }).catch(e => {
      this.presentAlert('error eliminarMascota', JSON.stringify(e));
    })

  }

  updatePerfil(id_usuario: number, nombre_usuario: string, apellido_usuario: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE usuarios
        SET nombre_usuario = ?, apellido_usuario = ?
        WHERE id_usuario = ?
      `;
      const params = [nombre_usuario, apellido_usuario, id_usuario];
  
      this.database.executeSql(query, params)
        .then(() => {
          console.log('Perfil actualizado correctamente.');
          this.router.navigate(['/cuenta']);
          resolve();
        })
        .catch((err) => {
          console.error('Error al actualizar el perfil:', err);
          reject(err);
        });
    });
  }
}


