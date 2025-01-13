import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarAnimalPage } from './modificar-animal.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarAnimalPageRoutingModule {}
