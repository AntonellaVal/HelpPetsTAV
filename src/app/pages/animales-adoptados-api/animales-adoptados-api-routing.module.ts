import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalesAdoptadosApiPage } from './animales-adoptados-api.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalesAdoptadosApiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalesAdoptadosApiPageRoutingModule {}
