import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAdopcionPageRoutingModule } from './form-adopcion-routing.module';

import { FormAdopcionPage } from './form-adopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormAdopcionPageRoutingModule
  ],
  declarations: [FormAdopcionPage]
})
export class FormAdopcionPageModule {}
