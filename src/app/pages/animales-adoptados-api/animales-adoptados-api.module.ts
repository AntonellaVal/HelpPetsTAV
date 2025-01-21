import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimalesAdoptadosApiPageRoutingModule } from './animales-adoptados-api-routing.module';

import { AnimalesAdoptadosApiPage } from './animales-adoptados-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimalesAdoptadosApiPageRoutingModule
  ],
  declarations: [AnimalesAdoptadosApiPage]
})
export class AnimalesAdoptadosApiPageModule {}
