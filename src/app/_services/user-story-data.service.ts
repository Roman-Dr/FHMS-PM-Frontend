import {UserStory} from '../_models/UserStory';
import {Injectable}     from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AppSettings} from "../app.settings";

@Injectable()
export class UserStoryDataService {

  constructor(private http: Http) {
  }

  private headers: Headers = new Headers({'Content-Type': 'application/json'});


  toggleUserStory(userstoryObject, changedcomplete) {
    return this.http.put
    (AppSettings.getProjectUrl() + '/userstories/' + userstoryObject._id,
      JSON.stringify({
        "title": userstoryObject.title,
        "complete": changedcomplete,
        "authorId": userstoryObject.authorId
      }), {withCredentials: true, headers: this.headers}
    )
      .map(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Update Backlog successful");
          return res.json();
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  addUserStory(userStory: UserStory) {
    return this.http.post(AppSettings.getProjectUrl() + '/userstories/', userStory, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: Array<any>) => {
        return new UserStory(item);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  updateUserStory(userStory: UserStory) {
    return this.http.put(AppSettings.getProjectUrl() + '/userstories/' + userStory._id, userStory, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((item: Array<any>) => {
        return new UserStory(item);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  deleteUserStory(id) {
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log("Service: " + id)
    return this.http.delete(AppSettings.getProjectUrl() + '/userstories/' + id, {withCredentials: true, headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  getUserStories() {
    return this.http.get(AppSettings.getProjectUrl() + '/userstories/', {withCredentials: true, headers: this.headers})
      .map((responseData) => {
        return responseData.json();
      })
      .map((userStories: Array<any>) => {
        let result: Array<UserStory> = [];
        if (userStories) {
          userStories.forEach((x) => {
            result.push(new UserStory(x));
          });
        }
        return result;
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleErrorDelete(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private handleError(error: Response | any) {
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

    console.log("nachPostService")
    return Observable.throw(errMsg);
  }
}

