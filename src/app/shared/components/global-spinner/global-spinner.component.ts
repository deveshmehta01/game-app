import { Observable } from 'rxjs';
import { LoaderService } from './../../../core/service/loader/loader.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
  styleUrls: ['./global-spinner.component.scss'],
})
export class GlobalSpinnerComponent {
  loader$: Observable<boolean>;
  constructor(private loaderService: LoaderService) {
    this.loader$ = this.loaderService.loader$;
  }
}
