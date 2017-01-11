import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http'
import 'rxjs/Rx'
import {HeaderService} from "./header.service";

@Injectable()
export class AuthenticationService {

  private loggedIn = false;

  private _apiUrl = 'http://10.60.67.20:3000/api/user/';
  // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http, private headerService: HeaderService) {
    this.loggedIn = !!localStorage.getItem('auth_token');


  }

  login(email, password) {
    let headers = this.headerService.setHeadersForPost();

    return this.http
      .post(
        this._apiUrl +'login',
        JSON.stringify({ email, password }),
        {headers }
      )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          let resBody = res.json();

          localStorage.setItem('auth_token', resBody.auth_token);
          localStorage.setItem('user_id', resBody.user_id);

          console.log("Login successful");
        }
      })

  }

  logout() {
    let headers = this.headerService.setHeadersForGet();

    return this.http.get(this._apiUrl +'logout', {headers})
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_id');

          console.log("Logout successful");
        }
      })
  }

  isLoggedIn() {
    return this.loggedIn;
  }


  registerUser(email, password) {
    let headers = this.headerService.setHeadersForPost();

    return this.http.post
    (this._apiUrl +'signup',
      JSON.stringify({email, password}), {headers }
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          res.json();
          console.log("Register successful");
        }
      })
  }



}
