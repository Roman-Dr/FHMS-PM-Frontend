import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";

@Injectable()
export class SprintService {

  private _apiUrl = sessionStorage.getItem('project_url')+'/sprints/';
  // private _apiUrl = 'http://localhost:3000/api/projects/';

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }


  createSprint(sprintName: string, startDate: string, endDate: string ) {
    return this.http.post
    (this._apiUrl,
      JSON.stringify({sprintName, startDate, endDate}), {withCredentials: true, headers: this.headers}
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


  updateSprint(sprintId: string, sprintName: string, startDate: string, endDate: string ) {
    return this.http.put
    (this._apiUrl+sprintId,
      JSON.stringify({sprintName, startDate, endDate}), {withCredentials: true, headers: this.headers}
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
          console.log("Delete Sprint successful");
          return res.json();
        }
      })
  }


  createSprintCapacity(sprintId: string, userId: string, daysOff: number, capacityPerDay: number ) {
    return this.http.post
    (this._apiUrl+sprintId+"/sprintcapacities",
      JSON.stringify({userId, daysOff, capacityPerDay}), {withCredentials: true, headers: this.headers}
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

  deleteSprintCapacity(sprintId, sprintCapacityId) {
    return this.http.delete(this._apiUrl+sprintId+"/sprintcapacities/"+sprintCapacityId, {withCredentials: true, headers: this.headers})
      .map(res => {
        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Delete Sprint Capacity successful");
          return res.json();
        }
      })
  }


    getSprints() {
    return this.http.get(this._apiUrl, {withCredentials: true, headers: this.headers})
      .map(res => res.json())
  }

  getSprint(sprintId: string) {
    return this.http.get(this._apiUrl+sprintId, {withCredentials: true, headers: this.headers})
      .map(res => res.json())
  }

  getSprintCapacities(sprintId: string){
    return this.http.get(this._apiUrl+sprintId+"/sprintcapacities", {withCredentials: true, headers: this.headers})
      .map(res => res.json())
  }

}
