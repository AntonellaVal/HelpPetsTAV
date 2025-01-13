import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-animal',
  templateUrl: './informacion-animal.page.html',
  styleUrls: ['./informacion-animal.page.scss'],
  standalone: false,
})
export class InformacionAnimalPage implements OnInit {

  animal: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.animal = navigation?.extras.state || {};
  }

  adoptar() {
    if (!this.animal.adoptado) {
      this.animal.adoptado = true; // Marcamos al animal como adoptado
      this.router.navigate(['/form-adopcion'], {
        state: { nombre: this.animal.nombre, imagen: this.animal.imagen },
      });
    }
  }

  volver() {
    this.router.navigate(['/animales-en-adopcion']);
  }

  ngOnInit() {
  }

}
