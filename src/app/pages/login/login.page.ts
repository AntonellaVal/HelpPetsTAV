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
  contra: string = '';

  constructor(private alertController: AlertController,  private router: Router) { }
  
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

    if (this.email === adminEmail && this.contra === adminContra) {
      this.router.navigate(['/principal-admin']);
      return;
    }

    // Si es usuario normal, realiza una validación simple
    if (this.email && this.contra) {
      this.presentAlert("¡BIENVENIDO!","Te damos la bienvenida a HelpPets");
      this.router.navigate(['/animales-en-adopcion']);
    } else {
      alert('Por favor, ingresa tu correo y contraseña.');
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }



  ngOnInit() {
  }
  
}
