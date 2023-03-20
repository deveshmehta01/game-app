import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(heading: string, message: string, options?: object): void {
    this.toastr.success(message, heading, {
      timeOut: 6000,
      ...options
    });
  }
  showError(heading: string, message: string, options?: object): void {
    this.toastr.error(message, heading, {
      timeOut: 6000,
      ...options
    });
  }
  showInfo(heading: string, message: string, options?: object): void {
    this.toastr.info(message, heading, {
      timeOut: 6000,
      ...options
    });
  }
  showWarning(heading: string, message: string, options?: object): void {
    this.toastr.warning(message, heading, {
      timeOut: 3000,
      ...options
    });
  }
}
