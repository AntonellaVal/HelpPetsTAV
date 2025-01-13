import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAnimalPage } from './agregar-animal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAnimalPageRoutingModule {}
