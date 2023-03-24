import { AuthService } from './../../service/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { IAccessAllowed } from '../../service/auth/auth.interface';

@Injectable({
  providedIn: 'root'
})
export default class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().pipe(map((response: IAccessAllowed) => {
      console.log(`🚀 ~ file: auth.guard.ts:16 ~ returnthis.authService.isAuthenticated ~ response:`, response)
      if (response.accessAllowed) {
        return true;
      }
      else {
        this.router.navigate(['/auth/sign-in']);
        return false;
      }
    }), catchError((error) => {
      this.router.navigate(['/auth/sign-in']);
      return of(false);
    }));
  }

}
