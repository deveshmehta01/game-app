import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthGuard from 'src/app/core/guards/auth/auth.guard';

const routes: Routes = [{
  path: '', component: BaseLayoutComponent, canActivate: [AuthGuard], children: [
    {
      path: '', loadChildren: () => import('./../../module/home/home.module').then((module) => (module.HomeModule))
    },
    {
      path: 'profile', loadChildren: () => import('./../../module/profile/profile.module').then((module) => (module.ProfileModule))
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseLayoutRoutingModule { }
