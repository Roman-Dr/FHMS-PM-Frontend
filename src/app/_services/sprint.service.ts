import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {AppSettings} from "../app.settings";

import {Sprint, SprintBurnDown, Retrospective} from "../_models/index";
import {Observable} from "rxjs";

@Injectable()
export class SprintService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
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
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

  }

  getUnfinishedSprints(){
    return this.http.get(AppSettings.getProjectUrl() + '/sprints/unfinished', {withCredentials: true, headers: this.headers})
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
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));
  }

  getSprint(sprintId: string) {
    return this.http.get(AppSettings.getProjectUrl() + '/sprints/' + sprintId, {
      withCredentials: true,
      headers: this.headers
    })
      .map((responseData) => {
        return responseData.json();
      })
      .map((sprint: any) => {
        return new Sprint(sprint);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));


  }

  getSprintBurndown(sprintId: string) {
    return this.http.get(AppSettings.getProjectUrl() + '/sprints/' + sprintId + '/burnDown', {withCredentials: true, headers: this.headers})
      .map( (responseData) => {
        return responseData.json();
      })
      .map((sprintBurnDown: any) => {
        return new SprintBurnDown(sprintBurnDown);
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

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
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

  }

  createSprintRetrospective(sprint) {
    return this.http.post
    (AppSettings.getProjectUrl() + '/sprints/' + sprint._id + "/retrospective", sprint, {withCredentials: true, headers: this.headers}
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
          console.log("Create Sprint Retrospective successful");
          return res.json();
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

  }


  updateSprintRetrospective(sprint, sprintRetrospective) {
    return this.http.put
    (AppSettings.getProjectUrl() + '/sprints/' + sprint._id + "/retrospective/" + sprintRetrospective._id, sprintRetrospective, {withCredentials: true, headers: this.headers}
    )
      .map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {

          console.log("Update Sprint Retrospective successful");
          return res.json();
        }
      })
      .catch((error: any) => Observable.of(error.json().error || 'Server error'));

  }




}



