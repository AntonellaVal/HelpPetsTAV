import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-animales-en-adopcion',
  templateUrl: './animales-en-adopcion.page.html',
  styleUrls: ['./animales-en-adopcion.page.scss'],
  standalone: false,
})
export class AnimalesEnAdopcionPage implements OnInit {

  animales = [
    { nombre: 'Teodora', imagen: '/assets/teo.jpg', especie: 'conejo', edad: '2 semanas', vacunas: 'no' },
    { nombre: 'Bolt', imagen: '/assets/perro_cafeynegro.jpg', especie: 'perro', edad: '3 meses', vacunas: 'sí' },
    { nombre: 'Estrellita', imagen: '/assets/gato_gris.jpg', especie: 'gato', edad: '1 año', vacunas: 'no' },
    { nombre: 'Atom', imagen: '/assets/atom.jpg', especie: 'gato', edad: '3 año', vacunas: 'no' },
    { nombre: 'Waton', imagen: '/assets/conejo_waton.jpg', especie: 'conejo', edad: '2 año', vacunas: 'no' },
    { nombre: 'Colo-Colo', imagen: '/assets/perro_negroyblanco.jpg', especie: 'perro', edad: '2 meses', vacunas: 'no' },
    { nombre: 'Mishu', imagen: '/assets/gato_naranja.jpg', especie: 'gato', edad: '1 año', vacunas: 'no' },
    { nombre: 'Sonny', imagen: '/assets/Sonny.jpg', especie: 'conejo', edad: '1 año', vacunas: 'no' },
  ];

  constructor(private router: Router) { }

  verDetalles(animal: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        nombre: animal.nombre,
        imagen: animal.imagen,
        especie: animal.especie,
        edad: animal.edad,
        vacunas: animal.vacunas,
      },
    };
    this.router.navigate(['/informacion-animal'], navigationExtras);
  }

  ngOnInit() {
  }

}
