import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthGuard from 'src/app/core/guards/auth/auth.guard';

const routes: Routes = [{
  path: '', component: BaseLayoutComponent, canActivate: [AuthGuard], children: [
    {
      path: '',
      loadChildren: () =>
        import('./../../module/home/home.module').then((module) =>
          (module.HomeModule)
        )
    },
    {
      path: 'profile',
      loadChildren: () =>
        import('./../../module/profile/profile.module').then((module) =>
          (module.ProfileModule)
        )
    },
    {
      path: 'view-games',
      loadChildren: () =>
        import('./../../module/view-online-game/view-online-game.module').then((module) =>
          (module.ViewOnlineGameModule)
        )
    },
    {
      path: 'select-games',
      loadChildren: () =>
        import('./../../module/select-game/select-game.module').then((module) =>
          (module.SelectGameModule)
        )
    },
    {
      path: 'games-point',
      loadChildren: () =>
        import('./../../module/game-point/game-point.module').then((module) =>
          (module.GamePointModule)
        )
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseLayoutRoutingModule { }
