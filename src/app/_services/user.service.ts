import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http'
import { User } from '../_models/user'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'



@Injectable()
export class UserService {

  private headers: Headers;


  constructor(private _http: Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  private _apiUrl = 'http://10.60.67.20:3000/api/users/';

  getUsers() {
    return this._http.get(this._apiUrl)
      .map(res => <User[]> res.json())
      .catch(this.handleError);
  }

  getUser(id:number) {
    return this._http.get(this._apiUrl + id)
      .map(res => <User>res.json())
      .catch(this.handleError);
  }

  addUser(newUser:User) {
    let toAdd = JSON.stringify({email: newUser.email, password: newUser.password, firstName: newUser.firstName, lastName: newUser.lastName, birthDate: newUser.birthDate})

    return this._http.post(this._apiUrl + 'signup', toAdd, { headers: this.headers })
      .map(res => <User>res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error')
  }


}



