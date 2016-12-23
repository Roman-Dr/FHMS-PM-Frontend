import {Component} from '@angular/core';
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {


  newUser: User = new User()
  errorMessage: string;

  constructor(private _userService: UserService, private _router: Router) {
  }


  addUser() {
    var success = this._userService.addUser(this.newUser)
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
