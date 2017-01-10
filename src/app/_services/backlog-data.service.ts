import { Injectable } from '@angular/core';
import {Backlog} from '../backlog/backlog';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BacklogDataService {

  constructor(private http:Http) { }

  private backlogitemsUrl = localStorage.getItem('project_url')+'/backlogitems';


  deleteBacklogitem (id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    console.log("Service Backlog: "+id)
    return this.http.delete(this.backlogitemsUrl+"/"+id,{headers: headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  postBacklogitemRestful(backlogName:string, backlogState:string, backlogAuthor:string, backlogDescription:string){

    console.log(backlogName+"; "+backlogAuthor)
    let body = JSON.stringify({ "title":backlogName,"state":backlogState,"authorId":backlogAuthor,"description":backlogDescription });
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
