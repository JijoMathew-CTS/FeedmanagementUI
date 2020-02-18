import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { AdminService } from './services/admin.service';

@Injectable()
export class NeedAdminGuard implements CanActivate {

  constructor(private adminService: AdminService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.adminService.isAdmin())
      return true;
    else {
      return false;
    }
  }
}
