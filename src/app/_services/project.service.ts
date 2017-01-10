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
    return this.http.get(this._apiUrl, { withCredentials: true })
      .map(res => res.json())
  }

  getProject(projectId) {
    return this.http.get(this._apiUrl+projectId)
      .map(res => res.json())
  }


  chooseProject(projectId) {
    if (localStorage.getItem('project_url') === null) {
      localStorage.setItem('project_id', projectId);
      localStorage.setItem('project_url', this._apiUrl+projectId)
    } else {
      localStorage.removeItem('project_id');
      localStorage.removeItem('project_url');

      localStorage.setItem('project_id', projectId);
      localStorage.setItem('project_url', this._apiUrl+projectId)
    }
  }

  createProject(displayName: string, description: string, dueDate: string, owner: string, stakeholders: string[], contributors: string[] ) {
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


  updateProject(displayName: string, description: string, dueDate: string, owner: string, stakeholders: string[], contributors: string[] ) {

    return this.http.put
    (this._apiUrl,
      JSON.stringify({displayName, description, dueDate, owner, stakeholders, contributors}), { headers: this.headers }
    )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("Update Project successful");
        }
        return res.success;
      })
  }


  removeProject(projectId) {
    return this.http.delete(this._apiUrl+projectId, {headers: this.headers})
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("Delete Project successful");
        }
        return res.success;
      })
  }
}
