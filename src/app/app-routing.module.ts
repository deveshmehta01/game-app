import { HomeComponent } from './module/home/components/home/home.component';
import { SignInComponent } from './module/auth/components/sign-in/sign-in.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthGuard from './core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () => import('./layout/auth-layout/auth-layout.module').then((module) =>
          module.AuthLayoutModule
        )
      },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./layout/base-layout/base-layout.module').then((module) =>
          module.BaseLayoutModule
        )
      },
      {
        path: '**', component: HomeComponent, canActivate: [AuthGuard]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
