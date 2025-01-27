import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-cuenta',
  templateUrl: './modificar-cuenta.page.html',
  styleUrls: ['./modificar-cuenta.page.scss'],
  standalone: false,
})
export class ModificarCuentaPage implements OnInit {

  constructor(private router: Router) { }

  nombre_usuario: string = "";
  nombre_apellido: string = "";

  irPerfil(){
    let correcto = true;

    if(correcto){
      this.router.navigate(['/cuenta'])
    }
  }


  ngOnInit() {
  }

}
