import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalesEnAdopcionPage } from './animales-en-adopcion.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalesEnAdopcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalesEnAdopcionPageRoutingModule {}
