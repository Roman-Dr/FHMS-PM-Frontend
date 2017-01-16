import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx'
import {CanActivate} from "@angular/router";

@Injectable()
export class ProjectService implements CanActivate{
  private _apiUrl = 'http://10.60.67.20:3000/api/projects/';

  private headers: Headers = new Headers({'Content-Type': 'application/json'});


  private _canActivate: boolean = false;


  canActivate() {
    return this._canActivate;
  }

  constructor(private http: Http) {


  }


  getProjects() {
    return this.http.get(this._apiUrl, {withCredentials: true})
      .map(res => res.json())
  }

  getProject(projectId) {
    return this.http.get(this._apiUrl + projectId, {withCredentials: true})
      .map(res => res.json())
  }


  chooseProject(projectId) : void {
    this._canActivate = true;
    sessionStorage.setItem('project_id', projectId);
    sessionStorage.setItem('project_url', this._apiUrl + projectId);
  }

  createProject(displayName: string, description: string, dueDate: string, owner: string, stakeholders: string[], contributors: string[]) {

    return this.http.post
    (this._apiUrl,
      JSON.stringify({displayName, description, dueDate, owner, stakeholders, contributors}), {
        withCredentials: true,
        headers: this.headers
      }
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Create Project successful");
          return res.json();
        }
      })
  }


  updateProject(projectId: string, displayName: string, description: string, dueDate: string, owner: string, stakeholders: string[], contributors: string[]) {


    return this.http.put
    (this._apiUrl + projectId,
      JSON.stringify({displayName, description, dueDate, owner, stakeholders, contributors}), {
        withCredentials: true,
        headers: this.headers
      }
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Update Project successful");
          return res.json();
        }
      })
  }


  removeProject(projectId) {

    return this.http.delete(this._apiUrl + projectId, {withCredentials: true, headers: this.headers})
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Delete Project successful");
          return res.json();
        }
      })
  }


  setProjectSelectedFalse() {
    this._canActivate = false;
  }
}
