import { NavigationHelperService } from './../../../../core/service/navigation-helper/navigation-helper.service';
import { ToastService } from './../../../../core/service/toast-service/toast.service';
import { AuthService } from './../../../../core/service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isFormSubmit = false;
  form = new FormGroup({
    mobile: new FormControl('', Validators.compose([Validators.required]))
  });
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private navigationHelperService: NavigationHelperService
  ) {
  }

  ngOnInit(): void {

  }

  formValidations(controlName: string): boolean {
    const control = this.form.get(controlName) as FormControl;
    if (control.invalid && (this.isFormSubmit || control.touched || control.dirty)) {
      return true;
    } else {
      return false;
    }
  }
  onSubmit(): void {
    this.isFormSubmit = true;
    if (this.form.valid) {
      const payload = this.form.value as { mobile: string }
      this.authService.forgotPassword(payload).subscribe({
        next: (resData) => { },
        error: (error) => {
          if (
            error?.error?.errorMessage &&
            error?.error?.errorTitle
          ) {
            this.toastService.showError(error?.error?.errorTitle, error?.error?.errorMessage);
          }
        },
        complete: () => { },
      });
    }
  }

  navigateToPreviousUrl(): void {
    this.navigationHelperService.navigateToPreviousUrl();
  }
}
