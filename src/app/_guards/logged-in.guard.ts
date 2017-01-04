import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: AuthenticationService) {}

  canActivate() {
    return this.user.isLoggedIn();
  }
}
