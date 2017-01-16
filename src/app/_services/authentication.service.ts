import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/Rx'
import {ProjectService} from "./project.service";

@Injectable()
export class AuthenticationService {

  private loggedIn;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private _apiUrl = 'http://10.60.67.20:3000/api/user/';
  // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http, private projectService: ProjectService) {
    this.loggedIn = !!sessionStorage.getItem('user_id');

  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this._apiUrl +'login',
        JSON.stringify({ email, password }),
        { withCredentials:true, headers: headers }
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

          sessionStorage.setItem('user_id', resBody);

          return resBody;
        }
      })
  }

  logout() {
     return this.http.get(this._apiUrl +'logout', {headers: this.headers})
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          this.loggedIn = false;

          sessionStorage.removeItem('user_id');

          sessionStorage.removeItem('project_id');
          sessionStorage.removeItem('project_url');
          this.projectService.setProjectSelectedFalse();

          console.log(this.loggedIn);
          console.log("Logout successful");

          location.reload();

          return res.json();
        }
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
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Register successful");

          return res.json();
        }
      })
  }


}
