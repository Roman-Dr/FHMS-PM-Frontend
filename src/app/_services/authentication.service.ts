import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http'
import 'rxjs/Rx'

@Injectable()
export class AuthenticationService {

  private loggedIn = false;
  private headers = new Headers();
  private _apiUrl = 'http://10.60.67.20:3000/api/user/';
  // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.headers.append('Content-Type', 'application/json');

  }

  login(email, password) {
    return this.http
      .post(
        this._apiUrl +'login',
        JSON.stringify({ email, password }),
        {headers: this.headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          console.log("Login successful");
        }

        return res.success;
      })
  }

  logout() {
    return this.http.get(this._apiUrl +'logout')
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.removeItem('auth_token');
          console.log("Logout successful");
        }

        return res.success;
      })
  }

  isLoggedIn() {
    return this.loggedIn;
  }


  registerUser(email, password) {
    return this.http.post
    (this._apiUrl +'signup',
      JSON.stringify({email, password}), {headers: this.headers }
    )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("Register successful");
        }

        return res.success;
      })
  }


  setLoggedIn(){
    if (this.loggedIn == false) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
  }



}
