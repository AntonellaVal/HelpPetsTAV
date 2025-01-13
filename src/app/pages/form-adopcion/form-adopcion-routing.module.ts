import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAdopcionPage } from './form-adopcion.page';

const routes: Routes = [
  {
    path: '',
    component: FormAdopcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAdopcionPageRoutingModule {}
