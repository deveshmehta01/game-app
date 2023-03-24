import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideNavigationBarComponent } from './components/side-navigation-bar/side-navigation-bar.component';
import { TopNavigationBarComponent } from './components/top-navigation-bar/top-navigation-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    BaseLayoutComponent,
    SideNavigationBarComponent,
    TopNavigationBarComponent
  ],
  imports: [
    CommonModule,
    BaseLayoutRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class BaseLayoutModule { }
