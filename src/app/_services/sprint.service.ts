import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AppSettings} from "../app.settings";

import {Sprint} from "../_models/index";

@Injectable()
export class SprintService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }


  createSprint(sprintName: string, startDate, endDate) {
    return this.http.post
    (AppSettings.getProjectUrl() + '/sprints/',
      JSON.stringify({sprintName, startDate, endDate}), {withCredentials: true, headers: this.headers}
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Create Sprint successful");
          return res.json();
        }
      })
  }


  updateSprint(sprintId: string, sprintName: string, startDate, endDate) {
    return this.http.put
    (AppSettings.getProjectUrl() + '/sprints/' + sprintId,
      JSON.stringify({sprintName, startDate, endDate}), {withCredentials: true, headers: this.headers}
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Update Sprint successful");
          return res.json();
        }
      })
  }


  deleteSprint(sprintId) {
    return this.http.delete(AppSettings.getProjectUrl() + '/sprints/' + sprintId, {
      withCredentials: true,
      headers: this.headers
    })
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Delete Sprint successful");
          return res.json();
        }
      })
  }


  createSprintCapacity(sprintId: string, userId: string, daysOff: number, capacityPerDay: number) {
    return this.http.post
    (AppSettings.getProjectUrl() + '/sprints/' + sprintId + "/sprintcapacities",
      JSON.stringify({userId, daysOff, capacityPerDay}), {withCredentials: true, headers: this.headers}
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Create Sprint Capacity successful");
          return res.json();
        }
      })
  }

  deleteSprintCapacity(sprintId: string, sprintCapacityId: string) {
    return this.http.delete(AppSettings.getProjectUrl() + '/sprints/' + sprintId + "/sprintcapacities/" + sprintCapacityId, {
      withCredentials: true,
      headers: this.headers
    })
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Delete Sprint Capacity successful");
          return res.json();
        }
      })
  }

  updateSprintCapacity(sprintId: string, sprintCapacityId: string, userId: string, daysOff: number, capacityPerDay: number) {
    return this.http.put
    (AppSettings.getProjectUrl() + '/sprints/' + sprintId + "/sprintcapacities/" + sprintCapacityId,
      JSON.stringify({userId, daysOff, capacityPerDay}), {withCredentials: true, headers: this.headers}
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Update Sprint Capacity successful");
          return res.json();
        }
      })
  }

  getSprints() {
    return this.http.get(AppSettings.getProjectUrl() + '/sprints/', {withCredentials: true, headers: this.headers})
      .map((responseData) => {
        return responseData.json();
      })
      .map((sprints: Array<any>) => {
        let result: Array<Sprint> = [];
        if (sprints) {
          sprints.forEach((x) => {
            result.push(new Sprint(x));
          });
        }
        return result;
      });
  }


  getSprint(sprintId: string) {
    return this.http.get(AppSettings.getProjectUrl() + '/sprints/' + sprintId, {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((sprint: any) => {
        return new Sprint(sprint);
      });
  }
}
