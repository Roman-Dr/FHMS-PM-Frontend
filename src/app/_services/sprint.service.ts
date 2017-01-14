import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";

@Injectable()
export class SprintService {

  private _apiUrl = localStorage.getItem('project_url')+'/sprints/';
  // private _apiUrl = 'http://localhost:3000/api/projects/';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }


  createSprint(sprintName: string, startDate: string, endDate: string ) {
    return this.http.post
    (this._apiUrl,
      JSON.stringify({sprintName, startDate, endDate}), { headers: this.headers }
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Create Sprint successful");
          return res.json();
        }
      })
  }


  deleteSprint(sprintId) {
    return this.http.delete(this._apiUrl+sprintId, {withCredentials: true, headers: this.headers})
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Delete Project successful");
          return res.json();
        }
      })
  }


  createSprintCapacity(sprintId: string, userId: string, daysOff: number, capacityPerDay: number ) {
    return this.http.post
    (this._apiUrl+sprintId,
      JSON.stringify({userId, daysOff, capacityPerDay}), {headers: this.headers}
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Create Sprint Capacity successful");
          return res.json();
        }
      })
  }




    getSprints() {
    return this.http.get(this._apiUrl)
      .map(res => res.json())
  }

}
