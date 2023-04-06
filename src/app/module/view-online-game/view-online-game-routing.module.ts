import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGamesComponent } from './components/view-games/view-games.component';

const routes: Routes = [
  {
    path:'',component:ViewGamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewOnlineGameRoutingModule { }
