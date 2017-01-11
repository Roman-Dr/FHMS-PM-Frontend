import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";

@Injectable()
export class SprintService {

  private _apiUrl = localStorage.getItem('project_url')+'/sprints';
  // private _apiUrl = 'http://localhost:3000/api/projects/';

  private headers = new Headers();

  constructor(private http: Http) { }

  createSprint(sprintName: string, startDate: string, endDate: string, sprintCapacity: string[] ) {
    return this.http.post
    (this._apiUrl,
      JSON.stringify({sprintName, startDate, endDate, sprintCapacity}), { headers: this.headers }
    )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log("Create Project successful");
        }
        return res.success;
      })
  }

  getSprints() {
    return this.http.get(this._apiUrl, { withCredentials: true })
      .map(res => res.json())
  }

}
