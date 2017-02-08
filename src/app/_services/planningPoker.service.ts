/**
 * Created by David on 01.02.2017.
 */
import {Injectable, Output, EventEmitter} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx'

import { AppSettings } from '../app.settings';
import { PlanningPoker, PlanningPokerRound, PlanningPokerRoundVote, User } from '../_models/index';
import {Observable} from "rxjs";

@Injectable()
export class PlanningPokerService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }


  getPlanningPokers() {
    return this.http.get(AppSettings.getProjectUrl() + "/planningPokers/", {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((items: Array<any>) => {
        let result:Array<PlanningPoker> = [];
        if (items) {
          items.forEach((x) => {
            result.push(new PlanningPoker(x));
          });
        }
        return result;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  getActivePlanningPokers() {
    return this.http.get(AppSettings.getProjectUrl() + "/activePlanningPokers", {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((items: Array<any>) => {
        let result:Array<PlanningPoker> = [];
        if (items) {
          items.forEach((x) => {
            result.push(new PlanningPoker(x));
          });
        }
        return result;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  getPlanningPoker(id) {
    return this.http.get(AppSettings.getProjectUrl() + "/planningPokers/" + id, {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: Array<any>) => {
        return new PlanningPoker(item);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  removePlanningPoker(id) {
    return this.http.delete(AppSettings.getProjectUrl() + "/planningPokers/" + id, {withCredentials: true})
      .map( (responseData) => {
        return responseData.status == 200;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  addPlanningPoker(planningPoker: PlanningPoker) {
    return this.http.post(AppSettings.getProjectUrl() + "/planningPokers/", planningPoker, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        return new PlanningPoker(item);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  updatePlanningPoker(planningPoker: PlanningPoker) {
    return this.http.put(AppSettings.getProjectUrl() + "/planningPokers/" + planningPoker._id, planningPoker, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        return new PlanningPoker(item);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  participate(userId: string, planningPoker: PlanningPoker) {
    return this.http.post(AppSettings.getProjectUrl() + "/planningPokers/" + planningPoker._id + "/participants", {userId: userId}, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.status == 200;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  unparticipate(userId: string, planningPoker: PlanningPoker) {
    return this.http.delete(AppSettings.getProjectUrl() + "/planningPokers/" + planningPoker._id + "/participants/" + userId, {withCredentials: true, headers: this.headers})
      .map((responseData) => {
        return responseData.status == 200;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  getParticipantsOfPlanningPoker(id): Observable<Array<User>> {
    return this.http.get(AppSettings.getProjectUrl() + "/planningPokers/" + id + "/participants", {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((items: Array<any>) => {
        let result:Array<User> = [];
        if (items) {
          items.forEach((x) => {
            result.push(new User(x));
          });
        }
        return result;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
}
