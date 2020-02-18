import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn())
      return true;
    else {
      localStorage.clear();
    //  this.router.navigate(['login']);
      return false;
    }
  }
}
