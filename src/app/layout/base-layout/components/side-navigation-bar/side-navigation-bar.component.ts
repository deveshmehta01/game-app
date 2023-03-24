import { NavigationHelperService } from './../../../../core/service/navigation-helper/navigation-helper.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ISideNavRoutes, sideNavRoutes } from './../../../../core/constants/side-nav-config-route';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-side-navigation-bar',
  templateUrl: './side-navigation-bar.component.html',
  styleUrls: ['./side-navigation-bar.component.scss']
})
export class SideNavigationBarComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  sideNavRoutes: Array<ISideNavRoutes> = sideNavRoutes;
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  constructor(
    private navigationHelperService: NavigationHelperService
  ) { }
  ngOnInit(): void {
    this.navigationHelperService.$drawer.pipe(takeUntil(this.unsubscribe$)).subscribe((isOpen) => {
      this.openSideNavBar(isOpen);
    });
  }

  openSideNavBar(isOpen: boolean): void {
    if (isOpen) {
      this.sidenav?.open();
    } else {
      this.sidenav?.close();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(false);
    this.unsubscribe$.complete();
  }

}
