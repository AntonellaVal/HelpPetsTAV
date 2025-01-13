import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarAnimalPageRoutingModule } from './modificar-animal-routing.module';

import { ModificarAnimalPage } from './modificar-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarAnimalPageRoutingModule
  ],
  declarations: [ModificarAnimalPage]
})
export class ModificarAnimalPageModule {}
