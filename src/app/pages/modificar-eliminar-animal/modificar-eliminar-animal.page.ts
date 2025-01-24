import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-modificar-eliminar-animal',
  templateUrl: './modificar-eliminar-animal.page.html',
  styleUrls: ['./modificar-eliminar-animal.page.scss'],
  standalone: false,
})
export class ModificarEliminarAnimalPage implements OnInit {

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

  constructor(private bd: BdServicioService, private router: Router,) { }

  modificarMascota(x: any) {
    //guardar los datos del usuario en una variable de contexto
    let navigationExtras: NavigationExtras = {
      state: {
        mascotaE: x
      }
    }

    //envio la informacipón a la pagina de modificar
    this.router.navigate(['/modificar-animal'], navigationExtras);

  }

  eliminarMascota(x: any) {
    this.bd.eliminarMascota(x.id_mascota);
  }

  ngOnInit() {
    // Obtener las mascotas cuando la página se inicialice
    this.bd.fetchMascota().subscribe(data => {
      this.animales = data;
    });
  }

}

