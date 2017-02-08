import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../_models/user";
import {AuthenticationService} from "../_services/authentication.service";


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]
})
export class RegisterComponent {

  errorMessage: string = "Ein Benutzer mit dieser E-Mail Adresse ist bereits vorhanden.";

  newUser: User = new User();
  conflictExist: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }


  onSubmit() {
    this.authenticationService.registerUser(this.newUser.email, this.newUser.password, this.newUser.firstname, this.newUser.lastname, this.newUser.birthdate, this.newUser.role).subscribe(
      response => {
        console.log(response);
        if (response != "Conflict") {
          this.authenticationService.login(this.newUser.email, this.newUser.password).subscribe(response => {
              if (response != "Unauthorized") {
                if (sessionStorage.getItem('user_id')) {
                  // Get the redirect URL from our auth service
                  // If no redirect has been set, use the default
                  let redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/projects';
                  // Redirect the user
                  this.router.navigate([redirect]);
                }
              }
            }
          );
        } else {
          this.conflictExist = true;
        }
      });
  }
}
