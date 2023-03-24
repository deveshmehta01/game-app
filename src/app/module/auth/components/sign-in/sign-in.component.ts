import { ToastService } from './../../../../core/service/toast-service/toast.service';
import { ISignIn } from './../../../../core/service/auth/auth.interface';
import { AuthService } from './../../../../core/service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from 'src/app/core/utils/validation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isFormSubmit = false;
  isPasswordHide = true;
  form = new FormGroup(
    {
      userName: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
      createPasswordStrengthValidator()])),
    },
  );

  constructor(
    private authService: AuthService,
    private toastService: ToastService
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
      const payload: ISignIn = this.form.value as ISignIn;
      this.authService.signIn(payload).subscribe(
        {
          next: (value) => {

          },
          error: (error) => {
            if (
              error?.error?.errorMessage &&
              error?.error?.errorTitle
            ) {
              this.toastService.showError(error?.error?.errorTitle, error?.error?.errorMessage);
            }
          },
        }
      );
    }
  }
}
