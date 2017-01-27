import {Component, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Headers} from '@angular/http';
import { AuthenticationService } from '../_services/authentication.service';
import {AuthGuard} from "../_services/auth-guard.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})


export class LoginComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router, private authGuard: AuthGuard) {

  }

  onSubmit(email, password) {
    this.authenticationService.login(email, password).subscribe(() => {
    if (sessionStorage.getItem('user_id')) {
      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      let redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/projects';
      // Redirect the user
      this.router.navigate([redirect]);
  }
  })
  }


  isLoggedIn(){
    return this.authGuard.checkLogin("")
  }

}
