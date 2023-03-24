import { NavigationHelperService } from './../../../../core/service/navigation-helper/navigation-helper.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.scss']
})
export class TopNavigationBarComponent {

  constructor(
    private navigationHelperService: NavigationHelperService
  ) { }

  toggleSideNav(): void {
    this.navigationHelperService.$drawer.next(true);
  }
}
