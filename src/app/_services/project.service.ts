import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx'

@Injectable()
export class ProjectService {
  private _apiUrl = 'http://10.60.67.20:3000/api/projects/';
  // private _apiUrl = 'http://localhost:3000/api/projects/';

  private headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }


  getProjects() {
    return this.http.get(this._apiUrl)
      .map(res => res.json())
  }

  chooseProject(projectId) {
    if (localStorage.getItem('project_url') === null) {
      localStorage.setItem('project_url', this._apiUrl+projectId)
    } else {
      localStorage.removeItem('project_url');
      localStorage.setItem('project_url', this._apiUrl+projectId)
    }
  }

  createProject(displayName, description, dueDate, owner, stakeholders, contributors ) {

    return this.http.post
    (this._apiUrl,
      JSON.stringify({displayName, description, dueDate, owner, stakeholders, contributors}), { headers: this.headers }
    )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("Create Project successful");
        }
        return res.success;
      })
  }

  removeProject(projectId) {
    return this.http.delete(this._apiUrl+projectId, {headers: this.headers})
      .map(res => res.json())
      .toPromise()
      .then(() => null)
  }
}
