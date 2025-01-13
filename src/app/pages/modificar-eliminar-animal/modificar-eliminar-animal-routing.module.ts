import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarEliminarAnimalPage } from './modificar-eliminar-animal.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarEliminarAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarEliminarAnimalPageRoutingModule {}
