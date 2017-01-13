import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/Rx'


@Injectable()
export class UserService {


   private _apiUrl = 'http://10.60.67.20:3000/api/user/';
   // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http) {
  }

  getUsers() {
    return this.http.get(this._apiUrl)
      .map(res => res.json())
  }

  getUser(userId) {
    return this.http.get(this._apiUrl+userId)
      .map(res => res.json())
  }


  testCookieLink(){
    return this.http.get(this._apiUrl+'profile', {withCredentials: true})
      .map(res => res.json())
  }

}



