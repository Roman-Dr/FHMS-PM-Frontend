import {Component} from '@angular/core';
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {User} from "../_models/user";


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})



export class RegisterComponent {
  newUser: User = new User()
  errorMessage: string;

  constructor(private _userService: UserService, private _router: Router) {
  }


  onSubmit(email, password) {
    let success = this._userService.registerUser(email, password)
    if (success) {
      console.log(this._router);
      success.subscribe(
        user => this.newUser = user,
        error => this.errorMessage = <any> error
      );
      this._router.navigate(['landing']);
    } else {
      console.log("Register failed, display error to user");
    }
  }
}
