import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectGameRoutingModule } from './select-game-routing.module';
import { SelectGameComponent } from './components/select-game/select-game.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SelectGameComponent
  ],
  imports: [
    CommonModule,
    SelectGameRoutingModule,
    MatButtonModule
  ]
})
export class SelectGameModule { }
