import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";

@Injectable()
export class SprintService {
  private _apiUrl = 'http://10.60.67.20:3000/api/projects/';
  // private _apiUrl = 'http://localhost:3000/api/projects/';

  private headers = new Headers();

  constructor(private http: Http) { }

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
}
