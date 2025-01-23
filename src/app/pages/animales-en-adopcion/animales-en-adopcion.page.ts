import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-animales-en-adopcion',
  templateUrl: './animales-en-adopcion.page.html',
  styleUrls: ['./animales-en-adopcion.page.scss'],
  standalone: false,
})
export class AnimalesEnAdopcionPage implements OnInit {

  animales: any = [
    {
      id_mascota: 0,
      nombre_mascota: ' ',
      genero_mascota: ' ',
      edad_mascota: 0,
      unidad_edad: ' ',
      foto_mascota: ' ',
      vacunas: ' ',
      detalle_vacuna: ' ',
      especie: ' '
    },
  ];

  constructor(private router: Router, private bd: BdServicioService) { }

  //esto hay que modificar
  verDetalles(animal: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        id_mascota: animal.id_mascota,
        nombre_mascota: animal.nombre_mascota,
        foto_mascota: animal.foto_mascota,
        genero_mascota: animal.genero_mascota,
        edad_mascota: animal.edad_mascota,
        unidad_edad: animal.unidad_edad,
        vacunas: animal.vacunas,
        detalle_vacuna: animal.detalle_vacuna,
        especie: animal.especie 
      },
    };
    this.router.navigate(['/informacion-animal'], navigationExtras);
  }

  ngOnInit() {
     //consultar el estatus de la base de datos
     this.bd.dbStatus().subscribe(res=>{
      if(res){
        //subscribirnos al observable de la lista de usuarios y rellenar mi variable propia
        this.bd.fetchMascota().subscribe(data=>{
          this.animales = data;
        })
      }
    })
  }

}
