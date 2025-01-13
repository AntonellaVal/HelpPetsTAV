import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-animal',
  templateUrl: './modificar-animal.page.html',
  styleUrls: ['./modificar-animal.page.scss'],
  standalone: false,
})
export class ModificarAnimalPage implements OnInit {

  mascota: any;
  index: number | null = null;
  errores: any = {
    nombre: '',
    edad: '',
    vacunas: '',
  };


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.mascota = navigation.extras.state['mascota'];
      this.index = navigation.extras.state['index'];
    } else {
      this.mascota = {};
    }
  }

   // Validación para el nombre (no acepta números ni espacios)
   validarNombre() {
    const regexNombre = /^[A-Za-z]+$/;  // Solo letras, sin espacios

    if (!this.mascota.nombre || this.mascota.nombre.trim().length < 2) {
      this.errores.nombre = 'El nombre debe tener al menos 2 caracteres.';
    } else if (this.mascota.nombre.trim().length > 50) {
      this.errores.nombre = 'El nombre no puede exceder 50 caracteres.';
    } else if (!regexNombre.test(this.mascota.nombre.trim())) {
      this.errores.nombre = 'El nombre solo puede contener letras (sin espacios).';
    } else {
      this.errores.nombre = '';
    }
  }

  // Validación para la edad (solo números enteros)
  validarEdad() {
    const edad = this.mascota.edad?.toLowerCase();
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
    } else if (!esEntero(this.mascota.edad)) {
      this.errores.edad = 'La edad debe ser un número entero.';
    } else {
      this.errores.edad = 'La edad debe ser en días, meses o años (e.g., "10 días", "3 meses", "5 años").';
    }
  }

  // Validación de vacunas (solo acepta "Sí" o "No")
  validarVacunas() {
    const vacuna = this.mascota.vacunas?.toLowerCase();
    if (vacuna !== 'sí' && vacuna !== 'no') {
      this.errores.vacunas = 'Vacunas debe ser "Sí" o "No".';
    } else {
      this.errores.vacunas = '';
    }
  }

  guardar() {
    if (this.index !== null) {
      // Guardar los cambios
      this.router.navigate(['/principal-admin'], { state: { updated: true } });
    }
  }

  cancelar() {
    this.router.navigate(['/modificar-eliminar-animal']);
  }

  ngOnInit() {
  }

}
