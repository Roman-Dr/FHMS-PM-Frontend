import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http'
import 'rxjs/Rx'
import {Observable} from "rxjs";


@Injectable()
export class TaskService {


  private _apiUrl = 'http://10.60.67.20:3000/api/projects/';
  private backlogitemsUrl = sessionStorage.getItem('project_url')+'/backlogitems';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private project_id= sessionStorage.getItem('project_url');
  // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http) {
  }

  getTasks(backlogitem_id:string) {
    return this.http.get(this.project_id+"/backlogitems/"+backlogitem_id+"/tasks")
      .map(res => res.json())
  }

  deleteTask(backlogitem_id, task_id){
    return this.http.delete(this.backlogitemsUrl+"/"+backlogitem_id+"/tasks/"+task_id,{headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleErrorDelete(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  /* deleteBacklogitemTask(task_id, backlogitem_id){
     return this.http.delete(this.backlogitemsUrl+"/"+backlogitem_id+"/tasks/"+task_id,{headers: this.headers})
       .map(this.extractData)
       .catch(this.handleErrorDelete);
   }*/
}



