import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/Rx'


@Injectable()
export class TaskService {


  private _apiUrl = 'http://10.60.67.20:3000/api/projects/';
  private project_id= localStorage.getItem('project_url');
  // private _apiUrl = 'http://localhost:3000/api/user/';

  constructor(private http: Http) {
  }

  getTasks(backlogitem_id:string) {
    return this.http.get(this.project_id+"/backlogitems/"+backlogitem_id+"/tasks")
      .map(res => res.json())
  }
}



