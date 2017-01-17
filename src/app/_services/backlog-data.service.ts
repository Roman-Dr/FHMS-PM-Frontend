import { Injectable } from '@angular/core';
import {Backlog} from '../_models/backlog';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class BacklogDataService {

  constructor(private http:Http) { }

  private backlogitemsUrl = sessionStorage.getItem('project_url')+'/backlogitems';

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  updateBacklog(backlogName:string, backlogState:string, backlogAuthor:string, backlogDescription:string, backlogAssignedTo:string){
    return this.http.put
    (this.backlogitemsUrl,
      JSON.stringify({backlogName,backlogState,backlogAuthor,backlogDescription,backlogAssignedTo}),{ withCredentials: true, headers: this.headers}
    )
      .map(res => { if(res.status < 200 || res.status >= 300) {
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      console.log("Update Project successful");
      return res.json();
    }
  })
}

  deleteBacklogitem (id){
   // let headers = new Headers({ 'Content-Type': 'application/json' });
    console.log("Service: "+id)
    return this.http.delete(this.backlogitemsUrl+"/"+id,{headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  postTask(backlogitem_id:string, task:string, taskauthor:string){
    console.log(task)
    let body= JSON.stringify({"title":task,"authorId":taskauthor})
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.backlogitemsUrl+"/"+backlogitem_id+"/tasks",body,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postBacklogitemRestful(backlogName:string, backlogState:string, backlogAuthor:string, backlogDescription:string, backlogAssignedTo:string){
    console.log(backlogName+"; "+backlogAuthor)
    let body = JSON.stringify({ "title":backlogName,"state":backlogState,"authorId":backlogAuthor,"description":backlogDescription,"userStoryId":backlogAssignedTo });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    console.log("vorPostService Backlog")
    return this.http.post(this.backlogitemsUrl,body,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBacklogitems() {
    return this.http.get(this.backlogitemsUrl)
      .map(res => res.json())
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleErrorDelete(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    console.log("nachPostService Backlog")
    return Observable.throw(errMsg);
  }
}
