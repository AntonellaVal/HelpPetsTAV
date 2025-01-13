import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAnimalPageRoutingModule } from './agregar-animal-routing.module';

import { AgregarAnimalPage } from './agregar-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAnimalPageRoutingModule
  ],
  declarations: [AgregarAnimalPage]
})
export class AgregarAnimalPageModule {}
