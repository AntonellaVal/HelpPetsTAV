import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalAdminPageRoutingModule } from './principal-admin-routing.module';

import { PrincipalAdminPage } from './principal-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalAdminPageRoutingModule
  ],
  declarations: [PrincipalAdminPage]
})
export class PrincipalAdminPageModule {}
