import { NavigationHelperService } from './../../../../core/service/navigation-helper/navigation-helper.service';
import { Router } from '@angular/router';
import { ToastService } from './../../../../core/service/toast-service/toast.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../core/service/auth/auth.service';
import { ISignup } from './../../../../core/service/auth/auth.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import validation, { createPasswordStrengthValidator } from '../../../../core/utils/validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isFormSubmit = false;
  isPasswordHide = true;
  isConfirmPasswordHide = true;
  form = new FormGroup(
    {
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      mobile: new FormControl('', Validators.compose([Validators.required])),
      userName: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        createPasswordStrengthValidator()
      ])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
    },
    {
      validators: [validation.match('password', 'confirmPassword')]
    }
  );


  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    public navigationHelperService: NavigationHelperService
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
    const payload: ISignup = this.form.value as ISignup;
    if (this.form.valid) {
      this.authService.signUp(payload).subscribe({
        next: (resData) => {
          this.toastService.showError('', resData.message);
          this.router.navigate(['/auth/sign-in']);
        },
        error: (error) => {
          if (
            error?.error?.errorMessage &&
            error?.error?.errorTitle
          ) {
            this.toastService.showError(error?.error?.errorTitle, error?.error?.errorMessage);
          }
        },
        complete: () => {
          console.info('complete');
        }
      });
    }
  }
  navigateToPreviousUrl(): void {
    this.navigationHelperService.navigateToPreviousUrl();
  }
}
