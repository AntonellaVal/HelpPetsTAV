import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-animal',
  templateUrl: './informacion-animal.page.html',
  styleUrls: ['./informacion-animal.page.scss'],
  standalone: false,
})
export class InformacionAnimalPage implements OnInit {

  animales: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.animales =  navigation?.extras.state;
  }

  adoptar() {
    if (!this.animales.adoptado) {
      this.animales.adoptado = true; // Marcamos al animal como adoptado
      this.router.navigate(['/form-adopcion'], {
        state: { nombre: this.animales.nombre_mascota, imagen: this.animales.foto_mascota},
      });
    }
  }

  volver() {
    this.router.navigate(['/animales-en-adopcion']);
  }

  ngOnInit() {
  }

}
