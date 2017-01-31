import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/Rx'
import { AppSettings } from '../app.settings';

@Injectable()
export class UserService {


   private _apiUrl = AppSettings.API_ENDPOINT + 'api/user/';

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
}



