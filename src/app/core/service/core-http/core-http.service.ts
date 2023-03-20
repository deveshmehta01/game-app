import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreHttpService {
  token: any;
  authData: any;
  public companyIdSubject = new BehaviorSubject<any>(null);
  private authLocalStorageToken = `${environment.appVersion}-${environment.userdataKey}`;
  tenantId: any;

  constructor(private httpClient: HttpClient, private router: Router) {
    const helper = new JwtHelperService();
    this.authData = this.getAuthFromLocalStorage();
    this.token = helper.decodeToken(this.authData?.token);
  }

  getSecured(url: string, params?: any): Observable<any> {
    if (params) {
      return this.httpClient.get(url, { params });
    } else {
      return this.httpClient.get(url);
    }
  }

  patchSecured(url: string, payload: any): Observable<any> {
    return this.httpClient.patch(url, payload);
  }

  postSecured(url: string, payload: any): Observable<any> {
    return this.httpClient.post(url, payload);
  }

  postSecuredWithHeaders(url: string, payload: any, headers?: any): Observable<any> {
    return this.httpClient.post(url, payload, headers);
  }

  postBlobSecuredWithHeaders(url: string, payload: any, headers?: any): Observable<any> {
    return this.httpClient.post(url, payload, headers);
  }

  deleteSecured(url: any): Observable<any> {
    return this.httpClient.delete(url);
  }

  private getAuthFromLocalStorage(): string | undefined {
    try {
      const token: string | null = localStorage.getItem(this.authLocalStorageToken);
      if (token) {
        const authData: any = JSON.parse(token);
        return authData;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }


  getToken(): string | undefined {
    const helper = new JwtHelperService();
    this.authData = this.getAuthFromLocalStorage();
    this.token = helper.decodeToken(this.authData);
    return this.token;
  }

  getBlob(url: string): Observable<any> {
    return this.httpClient.get(url, { responseType: 'arraybuffer' });
  }
}
