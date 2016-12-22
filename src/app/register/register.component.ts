import { Component } from '@angular/core';
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {


  newUser: User = new User()
  errorMessage: string;

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  addUser() {
    this._userService.addUser(this.newUser)
      .subscribe(
        user => this.newUser = user,
        error => this.errorMessage = <any> error
      )
  }
}
