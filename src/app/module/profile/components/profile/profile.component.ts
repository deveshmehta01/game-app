import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignup } from 'src/app/core/service/auth/auth.interface';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { NavigationHelperService } from 'src/app/core/service/navigation-helper/navigation-helper.service';
import { ToastService } from 'src/app/core/service/toast-service/toast.service';
import validation, { createPasswordStrengthValidator } from 'src/app/core/utils/validation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isFormSubmit = false;
  isPasswordHide = true;
  isConfirmPasswordHide = true;
  form = new FormGroup(
    {
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      mobile: new FormControl('', Validators.compose([Validators.required])),
      userName: new FormControl('', Validators.compose([Validators.required, Validators.email])),
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
  }

  navigateToPreviousUrl(): void {
    this.navigationHelperService.navigateToPreviousUrl();
  }
}
