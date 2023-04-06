import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePointsComponent } from './components/game-points/game-points.component';

const routes: Routes = [
  { path: '', component: GamePointsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamePointRoutingModule { }
