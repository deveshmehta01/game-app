import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./layout/auth-layout/auth-layout.module').then((module) =>
      module.AuthLayoutModule
    )
  },
  {
    path: '',
    loadChildren: () => import('./layout/base-layout/base-layout.module').then((module) =>
      module.BaseLayoutModule
    )
  },
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'sign-in'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
