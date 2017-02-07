import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/Rx'

import { AppSettings } from '../app.settings';
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {

  redirectUrl: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private _apiUrl = AppSettings.API_ENDPOINT + 'api/user/';

  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    return this.http
      .post(
        this._apiUrl +'login',
        JSON.stringify({ email, password }),
        { withCredentials:true, headers: this.headers }
      )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          sessionStorage.setItem('user_id', res.json());

          return res.json();
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Unauthorized'));
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
          sessionStorage.removeItem('user_id');
          sessionStorage.removeItem('project_id');
          sessionStorage.removeItem('project_url');

          console.log("Logout successful");

          return res.json();
        }
      })
  }



  registerUser(email: string, password: string, firstname: string, lastname: string, birthdate: Date) {
    return this.http.post(this._apiUrl +'signup', JSON.stringify({email, password, firstname, lastname, birthdate}), { headers: this.headers })
      .map(res => {
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        else {
          console.log("Register successful");

          return res.json();
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Conflict'));
  }
}
