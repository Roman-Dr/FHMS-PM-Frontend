import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { User } from '../_models/user'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'



@Injectable()
export class UserService {

  constructor( private  http:Http) {

  }
  private _apiUrl = 'http://10.60.67.20:3000/api/users/';

  getUsers() {
    return this.http.get(this._apiUrl)
      .map(res => <User[]> res.json())
      .catch(this.handleError);
  }

  addUser(newUser:User) {
    let toAdd = JSON.stringify({firstName: newUser.firstName, lastName: newUser.lastName, birthDate: newUser.birthDate})

    return this.http.post(this._apiUrl, toAdd)
      .map(res => <User>res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error')
  }
}



