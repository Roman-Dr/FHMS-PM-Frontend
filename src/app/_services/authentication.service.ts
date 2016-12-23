import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../_models/user'
export {User}


let user = new User;
user.firstName = "Daniel";
user.lastName = "Bruns";
user.birthDate = "30.04.1991";

let users = [
 user
];


@Injectable()
export class AuthenticationService {


  constructor(
    private _router: Router){}

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
  }

  login(user){

    var authenticatedUser = users.find(u => u.firstName === user.firstName);
    if (authenticatedUser && authenticatedUser['birthDate'] === user.birthDate){
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      this._router.navigate(['home']);
      return true;
    }
    return false;

  }

  checkCredentials(){
    if (localStorage.getItem("user") === null){
      this._router.navigate(['login']);
    }
  }



}
