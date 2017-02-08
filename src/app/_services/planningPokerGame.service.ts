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
export class PlanningPokerGameService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }


  getActiveRound(gameId: string) {
    return this.http.get(AppSettings.getProjectUrl() + "/planningPokers/" + gameId + "/activeRound", {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        if(item) {
          return new PlanningPokerRound(item);
        } else {
          return null;
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  createNewRound(gameId: string) {
    // /projects/:project_id/planningPokers/:planning_poker_id/rounds
    return this.http.post(AppSettings.getProjectUrl() + "/planningPokers/" + gameId + "/rounds", {}, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        if(item) {
          return new PlanningPokerRound(item);
        } else {
          return null;
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  vote(gameId: string, roundId:string, userId: string, effort: number, reason: string) {
    return this.http.post(AppSettings.getProjectUrl() + "/planningPokers/" + gameId + "/rounds/" + roundId + "/votes", {voterId: userId, effort: effort, reason: reason}, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        if(item) {
          return new PlanningPokerRoundVote(item);
        } else {
          return null;
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  finishRound(gameId: string, roundId:string, state: string, vote: PlanningPokerRoundVote) {
    return this.http.put(AppSettings.getProjectUrl() + "/planningPokers/" + gameId + "/rounds/" + roundId, {state:state, vote: vote}, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: any) => {
        if(item) {
          return new PlanningPokerRound(item);
        } else {
          return null;
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
}
