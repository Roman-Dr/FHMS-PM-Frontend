import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/Rx'
import {Observable} from "rxjs";

import {AppSettings} from '../app.settings';

import {Initiative} from '../_models/index';
import {Feature} from "../_models/feature";

@Injectable()
export class InitiativeService {

  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getInitiatives() {
    return this.http.get(AppSettings.getProjectUrl() + '/initiatives')
      .map((responseData) => {
        return responseData.json();
      })
      .map((initiatives: Array<any>) => {
        let result: Array<Initiative> = [];
        if (initiatives) {
          initiatives.forEach((x) => {
            result.push(new Initiative(x));
          });
        }
        return result;
      });
  }

  deleteInitiative(initiative_id: string) {
    return this.http.delete(AppSettings.getProjectUrl() + '/initiatives/' + initiative_id, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  addInitiative(title: string, startDate: Date, endDate: Date, description: string, goal: string) {
    return this.http.post(AppSettings.getProjectUrl() + '/initiatives', {title: title, startDate: startDate, endDate: endDate, description: description, goal: goal})
      .map(this.extractData);
  }

  updateInitiative(initiative_id: string, title: string, startDate: Date, endDate: Date, description: string, goal: string) {
    return this.http.put(AppSettings.getProjectUrl() + '/initiatives/' + initiative_id, {title: title, startDate: startDate, endDate: endDate, description: description, goal: goal})
      .map(this.extractData);
  }

  getFeatures(initiative_id: string) {
    return this.http.get(AppSettings.getProjectUrl() + '/initiatives/' + initiative_id + '/features')
      .map((responseData) => {
        return responseData.json();
      })
      .map((features: Array<any>) => {
        let result: Array<Feature> = [];
        if (features) {
          features.forEach((x) => {
            result.push(new Initiative(x));
          });
        }
        return result;
      });
  }

  addFeature(initiative_id: string, title: string){
    return this.http.post(AppSettings.getProjectUrl() + '/initiatives/'+ initiative_id +'/features', {title: title})
      .map(this.extractData);
  }

  deleteFeature(initiative_id: string, feature_id: string){
    return this.http.delete(AppSettings.getProjectUrl() + '/initiatives/'+ initiative_id +'/features/' + feature_id)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleErrorDelete(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}



