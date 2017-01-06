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
  newUser: User = new User();
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }


  onSubmit(email, password) {
    let success = this.authenticationService.registerUser(email, password)
    if (success) {
      console.log(this.router);
      success.subscribe(
        user => this.newUser = user,
        error => this.errorMessage = <any> error
      );
      this.router.navigate(['landing']);
    } else {
      console.log("Register failed, display error to user");
    }
  }
}
