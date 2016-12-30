import { Component } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [UserService]
})
export class LandingComponent{

  users: User[];
  errorMessage: string;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }

}
