import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/Rx'
import {Observable} from "rxjs";

import {AppSettings} from '../app.settings';

import {Task} from '../_models/index';

@Injectable()
export class TaskService {

  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getTasks(backlogitem_id: string) {
    return this.http.get(AppSettings.getProjectUrl() + '/backlogitems/' + backlogitem_id + "/tasks")
      .map((responseData) => {
        return responseData.json();
      })
      .map((tasks: Array<any>) => {
        let result: Array<Task> = [];
        if (tasks) {
          tasks.forEach((x) => {
            result.push(new Task(x));
          });
        }
        return result;
      });
  }

  deleteTask(backlogitem_id: string, task_id) {
    return this.http.delete(AppSettings.getProjectUrl() + '/backlogitems/' + backlogitem_id + "/tasks/" + task_id, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  addTask(backlogitem_id: string, task: Task) {
    return this.http.post(AppSettings.getProjectUrl() + '/backlogitems/' + backlogitem_id + "/tasks", task)
      .map(this.extractData);
  }

  updateTask(backlogitem_id: string, task: Task) {
    return this.http.put(AppSettings.getProjectUrl() + '/backlogitems/' + backlogitem_id + "/tasks/" + task._id, task)
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



