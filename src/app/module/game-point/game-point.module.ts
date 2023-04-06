import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamePointRoutingModule } from './game-point-routing.module';
import { GamePointsComponent } from './components/game-points/game-points.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    GamePointsComponent
  ],
  imports: [
    CommonModule,
    GamePointRoutingModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class GamePointModule { }
