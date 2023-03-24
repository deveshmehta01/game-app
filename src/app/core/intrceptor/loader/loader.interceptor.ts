import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../service/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  activatedRequest = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.activatedRequest === 0) {
      this.loaderService.triggerLoader(true);
    }
    this.activatedRequest++;
    return next.handle(request).pipe(finalize(() => {
      this.stopLoader();
    }));
  }
  stopLoader() {
    this.activatedRequest--;
    if (this.activatedRequest === 0) {
      this.loaderService.triggerLoader(false);
    }
  }
}
