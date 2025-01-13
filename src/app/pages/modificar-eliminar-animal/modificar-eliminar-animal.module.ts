import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarEliminarAnimalPageRoutingModule } from './modificar-eliminar-animal-routing.module';

import { ModificarEliminarAnimalPage } from './modificar-eliminar-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarEliminarAnimalPageRoutingModule
  ],
  declarations: [ModificarEliminarAnimalPage]
})
export class ModificarEliminarAnimalPageModule {}
