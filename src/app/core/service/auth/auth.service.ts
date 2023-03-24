import { ISignup, ISignIn, IAccessAllowed } from './auth.interface';
import { CoreHttpService } from './../core-http/core-http.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, catchError, of, finalize, map, switchMap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../../constants/apiEndPoint';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  private authLocalStorageToken = `${environment.appVersion}-${environment.userdataKey}`;
  currentUser$: Observable<any>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  isLoadingSubject: BehaviorSubject<boolean>;
  currentTenantKey = 'currentTenant';


  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private router: Router,
    private coreHttpService: CoreHttpService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  signIn(payload: ISignIn): Observable<any> {
    const url = this.baseUrl + apiEndPoint.auth.signIn;
    return this.coreHttpService.postSecured(url, payload).pipe(
      map((auth) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      catchError((err) => {
        throw err;
      }),
    );
  }

  signUp(payload: ISignup): Observable<any> {
    const url = this.baseUrl + apiEndPoint.auth.signUp;
    return this.coreHttpService.postSecured(url, payload);
  }


  logout(): void {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/sign-in'], {
      queryParams: {},
    });
    localStorage.clear();
  }


  sendOTP(payload: {
    'userUUID'?: string,
    'contactNo': string | number
  }) {
    const url = this.baseUrl + apiEndPoint.auth.sendOtp;
    return this.coreHttpService.postSecured(url, payload);
  }

  verifyOTP(payload: {
    'userUUID'?: string,
    'contactNo': string | number,
    'otp': string
  }) {
    const url = this.baseUrl + apiEndPoint.auth.verifyOTP;
    return this.coreHttpService.postSecured(url, payload);
  }


  forgotPassword(payload: { mobile: string }): Observable<any> {
    const url = this.baseUrl + apiEndPoint.auth.forgetPassword;
    return this.coreHttpService.postSecured(url, payload);
  }

  private setAuthFromLocalStorage(auth: any): boolean {
    if (auth && auth.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private setTokenInLocalStorage(auth: any) {
    if (auth && auth.error.text) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.error.text));
      return true;
    }
    return false;
  }

  isAuthenticated(): Observable<IAccessAllowed> {
    try {
      const authData = this.coreHttpService.getToken();
      if (authData) {
        return of({ accessAllowed: true });
      } else {
        this.router.navigate(['/auth/sign-in']);
        return of({ accessAllowed: false });
      }
    } catch (error) {
      return of({ accessAllowed: false });
    }
  }

  resetPassword(passwordDetails: {
    'uuid': string,
    'password': string
  }): any {
    const url = this.baseUrl + apiEndPoint.auth.resetPassword;
    return this.coreHttpService.postSecured(url, passwordDetails);
  }
}
