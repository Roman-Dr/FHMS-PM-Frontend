import {Injectable, Output, EventEmitter,} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx'
import {Observable} from "rxjs";

import { AppSettings } from '../app.settings';
import { Project } from '../_models/index';

@Injectable()
export class AdminService {
  private _apiUrl =  AppSettings.API_ENDPOINT + 'system/';

  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  initializeDatabase() {
    return this.http.get(this._apiUrl + 'databaseInitialisation', {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.status == 200;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
}
