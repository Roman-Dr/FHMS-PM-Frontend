import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/Rx'
import {Observable} from "rxjs";


@Injectable()
export class UserService {
  private loggedIn = false;
   private _apiUrl = 'http://10.60.67.20:3000/api/user/';
  // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  getUsers() {
    return this.http.get(this._apiUrl)
      .map(res => res.json())
  }


}



