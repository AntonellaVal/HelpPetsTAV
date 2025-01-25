import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-modificar-animal',
  templateUrl: './modificar-animal.page.html',
  styleUrls: ['./modificar-animal.page.scss'],
  standalone: false,
})
export class ModificarAnimalPage implements OnInit {

  animales: any;
  index: number | null = null;
  errores: any = {
    nombre: '',
    edad: '',
    vacunas: '',
  };

  constructor(private bd: BdServicioService, private router: Router, private activedrouter: ActivatedRoute) {
    //recepciono las variables de contexto
    this.activedrouter.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){        
        this.animales = this.router.getCurrentNavigation()?.extras?.state?.['mascotaE'];
        this.bd.presentAlert("dd",this.animales.especie+"");
        //this.bd.presentAlert("dd",this.animales.nombre_especie+"");
      }
    })
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    this.animales.foto_mascota = imageUrl;
  };

   // Validación para el nombre (no acepta números ni espacios)
   validarNombre() {
    const regexNombre = /^[A-Za-z]+$/;  // Solo letras, sin espacios

    if (!this.animales.nombre || this.animales.nombre.trim().length < 2) {
      this.errores.nombre = 'El nombre debe tener al menos 2 caracteres.';
    } else if (this.animales.nombre.trim().length > 50) {
      this.errores.nombre = 'El nombre no puede exceder 50 caracteres.';
    } else if (!regexNombre.test(this.animales.nombre.trim())) {
      this.errores.nombre = 'El nombre solo puede contener letras (sin espacios).';
    } else {
      this.errores.nombre = '';
    }
  }

  // Validación para la edad (solo números enteros)
  validarEdad() {
    const edad = this.animales.edad?.toLowerCase();
    const diasRegex = /^(\d{1,2})\s*días$/;
    const mesesRegex = /^(\d{1,2})\s*meses$/;
    const añosRegex = /^(\d{1,2})\s*años$/;

    // Validación de números enteros
    const esEntero = (valor: string) => Number.isInteger(Number(valor)) && Number(valor) > 0;

    if (diasRegex.test(edad)) {
      const dias = parseInt(edad.match(diasRegex)[1], 10);
      if (dias < 1 || dias > 31) {
        this.errores.edad = 'Los días deben estar entre 1 y 31.';
      } else {
        this.errores.edad = '';
      }
    } else if (mesesRegex.test(edad)) {
      const meses = parseInt(edad.match(mesesRegex)[1], 10);
      if (meses < 1 || meses > 12) {
        this.errores.edad = 'Los meses deben estar entre 1 y 12.';
      } else {
        this.errores.edad = '';
      }
    } else if (añosRegex.test(edad)) {
      const años = parseInt(edad.match(añosRegex)[1], 10);
      if (años < 1 || años > 38) {
        this.errores.edad = 'Los años deben estar entre 1 y 38.';
      } else {
        this.errores.edad = '';
      }
    } else if (!esEntero(this.animales.edad)) {
      this.errores.edad = 'La edad debe ser un número entero.';
    } else {
      this.errores.edad = 'La edad debe ser en días, meses o años (e.g., "10 días", "3 meses", "5 años").';
    }
  }

  // Validación de vacunas (solo acepta "Sí" o "No")
  validarVacunas() {
    const vacuna = this.animales.vacunas?.toLowerCase();
    if (vacuna !== 'sí' && vacuna !== 'no') {
      this.errores.vacunas = 'Vacunas debe ser "si" o "no".';
    } else {
      this.errores.vacunas = '';
    }
  }

  guardar(){
    this.bd.updateMascota(this.animales.nombre_mascota, this.animales.genero_mascota, this.animales.edad_mascota, this.animales.unidad_edad, this.animales.foto_mascota, this.animales.vacunas, this.animales.detalle_vacuna, this.animales.id_mascota, this.animales.especie );
  }

  cancelar() {
    this.router.navigate(['/modificar-eliminar-animal']);
  }

  ngOnInit() {
  }

}
