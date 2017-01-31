import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/Rx'
import {Observable} from "rxjs";

import { AppSettings } from '../app.settings';

import { Task } from '../_models/index';

@Injectable()
export class TaskService {

  private backlogitemsUrl = sessionStorage.getItem('project_url')+'/backlogitems';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private project_id= sessionStorage.getItem('project_url');

  constructor(private http: Http) {
  }

  getTasks(backlogitem_id:string) {
    return this.http.get(this.project_id+"/backlogitems/"+backlogitem_id+"/tasks")
      .map(res => res.json())
  }

  deleteTask(backlogitem_id:string, task_id){
    return this.http.delete(this.backlogitemsUrl+"/"+backlogitem_id+"/tasks/"+task_id,{headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  addTask(backlogitem_id:string, task: Task) {
    return this.http.post(this.project_id+"/backlogitems/"+backlogitem_id+"/tasks", task)
      .map(this.extractData);
  }
  updateTask(backlogitem_id:string, task: Task) {
    return this.http.put(this.project_id+"/backlogitems/"+backlogitem_id+"/tasks/" + task._id, task)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleErrorDelete(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}



