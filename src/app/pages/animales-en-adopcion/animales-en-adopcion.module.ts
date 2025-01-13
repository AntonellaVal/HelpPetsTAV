import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimalesEnAdopcionPageRoutingModule } from './animales-en-adopcion-routing.module';

import { AnimalesEnAdopcionPage } from './animales-en-adopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimalesEnAdopcionPageRoutingModule
  ],
  declarations: [AnimalesEnAdopcionPage]
})
export class AnimalesEnAdopcionPageModule {}
