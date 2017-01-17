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
  newUser: User;
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }


  onSubmit(email, password, firstname, lastname, birthdate) {
    this.authenticationService.registerUser(email, password, firstname, lastname, birthdate ).subscribe(
        user => this.newUser = user,
        error => this.errorMessage = <any> error
      );

    }


}
