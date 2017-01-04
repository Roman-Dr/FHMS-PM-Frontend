


import {UserStory} from '../user-story/UserStory';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../_models/user";

@Injectable()
export class UserStoryDataService {


  constructor (private http: Http) {}

  private userstoriesUrl = 'http://localhost:3000/api/userstories';

  postUserStoryRestful(userStoryName:string,userStoryComplete:boolean,userStoryAuthor:string,userStoryTimeStamp:Date){

    let body = JSON.stringify({ "title":userStoryName,"complete":userStoryComplete,"author":userStoryAuthor,"timestmp":userStoryTimeStamp });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });

    return this.http.post(this.userstoriesUrl,body,options)
      .map(res => res.json())
      .catch(this.handleError);
  }


  get_All_Userstories(): Observable<UserStory[]>{
    return this.http.get(this.userstoriesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }







  /*// Simulate POST /todos
  addUserStory(userStory: UserStory): UserStoryDataService {
    if(userStory.author==''||userStory.title==''){

    }
    else {
      if (!userStory.id) {
        userStory.id = ++this.lastId;
      }
      this.userStories.push(userStory);
      return this;
    }
  }

  // Simulate DELETE /todos/:id
  deleteUserStoryById(id: number): UserStoryDataService {
    this.userStories = this.userStories
      .filter(userStory => userStory.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateUserStoryById(id: number, values: Object = {}): UserStory {
    let userStory = this.getUserStoryById(id);
    if (!userStory) {
      return null;
    }
    Object.assign(userStory, values);
    return userStory;
  }

  // Simulate GET /todos
  getAllUserStories(): UserStory[] {
    console.log("Service: getAllUserStories()");
    return this.userStories;
  }

  // Simulate GET /todos/:id
  getUserStoryById(id: number): UserStory {
    return this.userStories
      .filter(userStory => userStory.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleUserStoryComplete(userStory: UserStory) {
    let updatedTodo = this.updateUserStoryById(userStory.id, {
      complete: !userStory.complete
    });
    return updatedTodo;
  }*/
}

