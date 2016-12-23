import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/Rx'


@Injectable()
export class UserService {
  private loggedIn = false;
  private _apiUrl = 'http://10.60.67.20:3000/api/users/';

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this._apiUrl +'login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  registerUser(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');



    return this.http.post
    (this._apiUrl +'signup',
      JSON.stringify({email, password}), { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("Register successful");
        }

        return res.success;
      })
  }

}



