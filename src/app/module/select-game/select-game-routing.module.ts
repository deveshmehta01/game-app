import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectGameComponent } from './components/select-game/select-game.component';

const routes: Routes = [
  {
    path:'',component:SelectGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectGameRoutingModule { }
