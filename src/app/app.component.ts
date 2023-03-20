import { NavigationHelperService } from './core/service/navigation-helper/navigation-helper.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private navigationHelperService: NavigationHelperService) {
    this.navigationHelperService.initialize();
  }
  title = 'game';
}
