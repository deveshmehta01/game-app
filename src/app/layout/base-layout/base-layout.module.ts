import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BaseLayoutComponent
  ],
  imports: [
    CommonModule,
    BaseLayoutRoutingModule,
  ]
})
export class BaseLayoutModule { }
