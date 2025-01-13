import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: false,
})
export class CuentaPage implements OnInit {
  nombre:string = "renata";
  apellido:string = "correa";
  email: string = 'rena.correa@gmail.com';

  constructor(private router: Router) { 
  }

  ModificarCuenta(){
    let correcto = true;

    if(correcto){
      this.router.navigate(['/modificar-cuenta'])
    }
  }


  ngOnInit() {
  }

}
