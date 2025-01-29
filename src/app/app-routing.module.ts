import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'animales-en-adopcion',
    loadChildren: () => import('./pages/animales-en-adopcion/animales-en-adopcion.module').then( m => m.AnimalesEnAdopcionPageModule)
  },
  {
    path: 'form-adopcion',
    loadChildren: () => import('./pages/form-adopcion/form-adopcion.module').then( m => m.FormAdopcionPageModule)
  },
  {
    path: 'principal-admin',
    loadChildren: () => import('./pages/principal-admin/principal-admin.module').then( m => m.PrincipalAdminPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'agregar-animal',
    loadChildren: () => import('./pages/agregar-animal/agregar-animal.module').then( m => m.AgregarAnimalPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'modificar-cuenta',
    loadChildren: () => import('./pages/modificar-cuenta/modificar-cuenta.module').then( m => m.ModificarCuentaPageModule)
  },
  {
    path: 'informacion-animal',
    loadChildren: () => import('./pages/informacion-animal/informacion-animal.module').then( m => m.InformacionAnimalPageModule)
  },
  {
    path: 'modificar-eliminar-animal',
    loadChildren: () => import('./pages/modificar-eliminar-animal/modificar-eliminar-animal.module').then( m => m.ModificarEliminarAnimalPageModule)
  },
  {
    path: 'modificar-animal',
    loadChildren: () => import('./pages/modificar-animal/modificar-animal.module').then( m => m.ModificarAnimalPageModule)
  },
  {
    path: 'modificar-contra',
    loadChildren: () => import('./pages/modificar-contra/modificar-contra.module').then( m => m.ModificarContraPageModule)
  },
  {
    path: 'animales-adoptados-api',
    loadChildren: () => import('./pages/animales-adoptados-api/animales-adoptados-api.module').then( m => m.AnimalesAdoptadosApiPageModule)
  },
  {
    path: 'recuperar-contra',
    loadChildren: () => import('./pages/recuperar-contra/recuperar-contra.module').then( m => m.RecuperarContraPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
