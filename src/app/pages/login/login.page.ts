import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private alertController: AlertController,  private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { email: string; password: string };

    if (state) {
      this.registroEmail = state.email;
      this.registroPassword = state.password;
    }
  }
  
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
    
    // Credenciales del admin
    const adminEmail = 'admin@helppets.cl';
    const adminContra = 'Admin.4419';

    if (this.email === adminEmail && this.password=== adminContra) {
      this.router.navigate(['/principal-admin']);
      return;
    }

    if (this.email.trim() === '' || this.password.trim() === '') {
      this.presentAlert("Error","no puede dejar campos vacios")
      return;
    }

    if (this.email === this.registroEmail && this.password === this.registroPassword) {
      this.presentAlert("¡BIENVENIDO!","Te damos la bienvenida a HelpPets");
      this.router.navigate(['/animales-en-adopcion'])
    } else {
      this.presentAlert("Error","el correo o la contraseña no son correctos")
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }



  ngOnInit() {
  }
  
}
