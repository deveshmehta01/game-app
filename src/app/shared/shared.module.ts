import { GlobalSpinnerComponent } from './components/global-spinner/global-spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    GlobalSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    GlobalSpinnerComponent,

  ]
})
export class SharedModule { }
