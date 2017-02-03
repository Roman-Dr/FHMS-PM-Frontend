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
      });
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
      });
  }

  getPlanningPoker(id) {
    return this.http.get(AppSettings.getProjectUrl() + "/planningPokers/" + id, {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: Array<any>) => {
        return new PlanningPoker(item);
      });
  }

  removePlanningPoker(id) {
    return this.http.delete(AppSettings.getProjectUrl() + "/planningPokers/" + id, {withCredentials: true})
      .map( (responseData) => {
        return responseData.status == 200;
      });
  }

  addPlanningPoker(planningPoker: PlanningPoker) {
    return this.http.post(AppSettings.getProjectUrl() + "/planningPokers/", planningPoker, this.headers)
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        return new PlanningPoker(item);
      });
  }
  updatePlanningPoker(planningPoker: PlanningPoker) {
    return this.http.put(AppSettings.getProjectUrl() + "/planningPokers/" + planningPoker._id, planningPoker, this.headers)
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        return new PlanningPoker(item);
      });
  }

  participate(userId: string, planningPoker: PlanningPoker) {
    return this.http.post(AppSettings.getProjectUrl() + "/planningPokers/" + planningPoker._id + "/participants", {userId: userId}, this.headers)
      .map( (responseData) => {
        return responseData.status == 200;
      });
  }
  unparticipate(userId: string, planningPoker: PlanningPoker) {
    return this.http.delete(AppSettings.getProjectUrl() + "/planningPokers/" + planningPoker._id + "/participants/" + userId, this.headers)
      .map((responseData) => {
        return responseData.status == 200;
      });
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
      });
  }
}
