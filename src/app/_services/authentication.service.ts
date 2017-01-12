import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/Rx'
import {HeaderService} from "./header.service";
import {ProjectService} from "./project.service";



@Injectable()
export class AuthenticationService {

  private loggedIn = false;

  private _apiUrl = 'http://10.60.67.20:3000/api/user/';
  // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http, private headerService: HeaderService, private projectService: ProjectService) {
    this.loggedIn = !!localStorage.getItem('user_id');


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
          this.loggedIn = true;

          localStorage.setItem('auth_token', resBody.auth_token);
          localStorage.setItem('user_id', resBody);

          console.log(localStorage.getItem('auth_token'));
          console.log(localStorage.getItem('user_id'));

          console.log(this.loggedIn);
          console.log("Login successful");

          return resBody;
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
          this.loggedIn = false;

          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_id');

          localStorage.removeItem('project_id');
          localStorage.removeItem('project_url');
          this.projectService.setProjectSelectedFalse();

          console.log(this.loggedIn);
          console.log("Logout successful");

          location.reload();

          return res.json();
        }
      })
  }

  isLoggedIn() {
    console.log(this.loggedIn);
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

          return res.json();
        }
      })
  }



}
