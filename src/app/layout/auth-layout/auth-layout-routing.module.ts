import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: '',
        loadChildren: () => import('./../../module/auth/auth.module').then((module) =>
          module.AuthModule
        )
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
