import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-informacion-animal',
  templateUrl: './informacion-animal.page.html',
  styleUrls: ['./informacion-animal.page.scss'],
  standalone: false,
})
export class InformacionAnimalPage implements OnInit {

  animales: any;
  mascotaAdoptada: boolean = false;

  constructor(private router: Router, private bd: BdServicioService) {
    const navigation = this.router.getCurrentNavigation();
    this.animales =  navigation?.extras.state;
  }

   // Verificar si la mascota ya está adoptada
   verificarEstatusMascota(id_mascota: number) {
    this.bd.actualizarEstatusMascota(id_mascota) // Llama a la función del servicio de BD
      .then((adoptada) => {
        this.mascotaAdoptada = adoptada; // Actualiza el estado según el resultado
      })
      .catch((err) => {
        console.error('Error al verificar el estatus de adopción:', err);
      });
  }


  adoptar() {
      this.router.navigate(['/form-adopcion'], {
        state: { id_mascota: this.animales.id_mascota},
      });
    
  }

  volver() {
    this.router.navigate(['/animales-en-adopcion']);
  }

  ngOnInit() {
    if (this.animales?.id_mascota) {
      this.verificarEstatusMascota(this.animales.id_mascota);
    }
  }

}
