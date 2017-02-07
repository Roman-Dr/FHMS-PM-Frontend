import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})


export class LoginComponent {

  email: string;
  password: string;

  badLogin: boolean = false;


  errorMessage: string = "Ihre Benutzerdaten sind nicht korrekt.";


  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  onSubmit() {

      this.authenticationService.login(this.email, this.password).subscribe(response => {
        if (response != "Server error") {
          if (sessionStorage.getItem('user_id')) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/projects';
            // Redirect the user
            this.router.navigate([redirect]);
          }
        } else {
          this.badLogin = true;
        }
      });

  }





}
