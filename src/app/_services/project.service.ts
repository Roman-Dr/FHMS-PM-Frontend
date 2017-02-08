import {Injectable, Output, EventEmitter,} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx'
import {Observable} from "rxjs";

import { AppSettings } from '../app.settings';
import { Project } from '../_models/index';

@Injectable()
export class ProjectService {
  @Output() projectChosen = new EventEmitter();

  redirectUrl: string;


  private _apiUrl =  AppSettings.API_ENDPOINT + 'api/projects/';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }


  getProjects() {
    return this.http.get(this._apiUrl, {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((projects: Array<any>) => {
        let result:Array<Project> = [];
        if (projects) {
          projects.forEach((x) => {
            result.push(new Project(x));
          });
        }
        return result;
      });
    //.catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  getProject(projectId) {
    return this.http.get(this._apiUrl + projectId, {withCredentials: true})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((project: Array<any>) => {
        return new Project(project);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  getContributorsByProjectId(projectId) {
    return this.http.get(this._apiUrl + projectId + '/contributors', {withCredentials: true})
      .map(res => res.json())
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
  getStakeholdersByProjectId(projectId) {
    return this.http.get(this._apiUrl + projectId + '/stakeholders', {withCredentials: true})
      .map(res => res.json())
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  chooseProject(projectId) {
    sessionStorage.setItem('project_id', projectId);
    sessionStorage.setItem('project_url', this._apiUrl + projectId);

    this.getProject(projectId)
      .subscribe(project => this.projectChosen.emit(project));

    return Observable.of(true);
  }

  createProject(displayName: string, description: string, dueDate: string, owner: string, stakeholders: string[], contributors: string[]) {
    console.log('Create project');
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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }
}
