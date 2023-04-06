import { Component } from '@angular/core';

@Component({
  selector: 'app-game-points',
  templateUrl: './game-points.component.html',
  styleUrls: ['./game-points.component.scss']
})
export class GamePointsComponent {
  currentDate = new Date();
}
