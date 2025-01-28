import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  registroEmail: string = '';
  registroPassword: string = '';

  constructor(private alertController: AlertController,  private router: Router,private bd: BdServicioService) { }
  
  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  validateEmail(email: string): boolean {
    const regex = /^(.*)(@gmail\.com|@gmail\.cl|@helppets)$/;
    return regex.test(email);
  }

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.,?])(?=.{8,})/;
    return regex.test(password);
  } 

  login() {


    if (this.email.trim() === '' || this.password.trim() === '') {
      this.presentAlert("Error","no puede dejar campos vacios")
      return;
    }
     // Verificar si es el administrador
     if (this.email === 'admin@helppets.cl' && this.password === 'Admin.123456') {
      this.bd.buscarMascotas();
      this.router.navigate(['/principal-admin']);
      return;
    }

    // Verificar si el correo y la contraseña corresponden a un usuario normal
    this.bd.buscarUsuarios().then((usuarios: { id_usuario: number,correo: string; clave: string }[]) => {
      const usuario = usuarios.find(
        (user: { correo: string; clave: string }) =>
          user.correo === this.email && user.clave === this.password
      );
  
      if (usuario) {
        this.presentAlert('¡Bienvenido!', 'Te damos la bienvenida a HelpPets');
        this.bd.buscarMascotas();
        this.presentAlert("hh",usuario.id_usuario.toString());
        this.bd.buscarCuenta(usuario.id_usuario);
        localStorage.setItem('id_usuario', usuario.id_usuario.toString());
        this.router.navigate(['/animales-en-adopcion']);
      } else {
        this.presentAlert('Error', 'El correo o la contraseña no son correctos');
      }
    }).catch((error: any) => {
      this.presentAlert('Error', 'Ocurrió un error al buscar usuarios.');
      console.error(error);
    });
}

  irARegistro() {
    this.router.navigate(['/registro']);
  }



  ngOnInit() {
  }
  
}
