import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionAnimalPage } from './informacion-animal.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionAnimalPageRoutingModule {}
