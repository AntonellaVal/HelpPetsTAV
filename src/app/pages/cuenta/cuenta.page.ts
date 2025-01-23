import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: false,
})
export class CuentaPage implements OnInit {

  cuenta: any;

  constructor(private router: Router, private bd: BdServicioService) { 
  }

  ModificarCuenta(){
    let correcto = true;

    if(correcto){
      this.router.navigate(['/modificar-cuenta'])
    }
  }

  ModificarContra(){
    let correcto = true;

    if(correcto){
      this.router.navigate(['/modificar-contra'])
    }
  }


  ngOnInit() {
    //consultar el estatus de la base de datos
    this.bd.dbStatus().subscribe(res => {
      if (res) {
        // Subscribirse al observable de la lista de usuarios y rellenar mi variable propia
        this.bd.fetchCuenta().subscribe(data => {
          // Aquí debes asegurarte de que data contiene un solo usuario
          // Suponiendo que solo hay un usuario en la lista o se selecciona el usuario correcto
          if (data && data.length > 0) {
            this.cuenta = data[0]; // Asumimos que hay solo un usuario, si no, deberías filtrar por ID
          }
        });
      }
    });
  }

}
