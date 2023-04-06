import { NavigationHelperService } from './../../../../core/service/navigation-helper/navigation-helper.service';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.scss']
})
export class TopNavigationBarComponent {

  @ViewChild('toolBar')
  toolBar: ElementRef | any;

  // Declare height and width variables
  scrHeight: any;
  scrWidth: any;
  @HostListener('window:resize', ['$event']) getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // this.toolBar._elementRef.nativeElement.offsetHeight;
  }

  constructor(
    private navigationHelperService: NavigationHelperService
  ) { }

  ngAfterViewInit() {
    this.getScreenSize();
  }

  toggleSideNav(): void {
    this.navigationHelperService.$drawer.next(true);
  }
}
