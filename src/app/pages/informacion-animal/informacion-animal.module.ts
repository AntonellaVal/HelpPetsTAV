import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionAnimalPageRoutingModule } from './informacion-animal-routing.module';

import { InformacionAnimalPage } from './informacion-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionAnimalPageRoutingModule
  ],
  declarations: [InformacionAnimalPage]
})
export class InformacionAnimalPageModule {}
