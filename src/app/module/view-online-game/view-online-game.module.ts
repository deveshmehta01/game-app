import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOnlineGameRoutingModule } from './view-online-game-routing.module';
import { ViewGamesComponent } from './components/view-games/view-games.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ViewGamesComponent
  ],
  imports: [
    CommonModule,
    ViewOnlineGameRoutingModule,
    MatCardModule,
  ]
})
export class ViewOnlineGameModule { }
