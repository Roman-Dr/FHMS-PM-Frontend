import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { User } from '../_models/user'
export { User }
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

import {Router} from "@angular/router";



let user = new User;
user.firstName = "Daniel";
user.lastName = "Bruns";
user.birthDate = "30.04.1991";

let users = [
 user
];

// not neccessary!

@Injectable()
export class AuthenticationService {

  private _apiUrl = 'http://10.60.67.20:3000/api/users/';


  constructor(
    private _router: Router,
  private http:Http){}

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
  }

  login(user: User){

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
