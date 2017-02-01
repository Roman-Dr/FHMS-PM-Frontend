import {Injectable} from '@angular/core';
import {Backlog} from '../_models/backlog';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {map} from "rxjs/operator/map";
import {AppSettings} from '../app.settings';

@Injectable()
export class BacklogDataService {

  constructor(private http: Http) {
  }

  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  deleteBacklogitem(id) {
    return this.http.delete(AppSettings.getProjectUrl() + '/backlogItems/' + id, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleErrorDelete);
  }

  addBacklogItem(backlogItem: Backlog) {
    console.log(JSON.stringify(backlogItem));

    return this.http.post(AppSettings.getProjectUrl() + '/backlogItems/', backlogItem, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateBacklogItem(backlogItemId: string, backlogItem: Backlog) {
    console.log(JSON.stringify(backlogItem));

    return this.http.put(AppSettings.getProjectUrl() + '/backlogItems/' + backlogItemId, backlogItem, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBacklogitems() {
    return this.http.get(AppSettings.getProjectUrl() + '/backlogItems')
      .map( (responseData) => {
        return responseData.json();
      })
      .map((backlogItems: Array<any>) => {
        let result:Array<Backlog> = [];
        if (backlogItems) {
          backlogItems.forEach((x) => {
            result.push(new Backlog(x));
          });
        }
        return result;
      });
  }

  getBacklogitem(backlogItemId: string) {
    return this.http.get(AppSettings.getProjectUrl() + '/backlogItems/' + backlogItemId)
      .map( (responseData) => {
        return responseData.json();
      })
      .map((backlogItem: any) => {
        return new Backlog(backlogItem);
      });
  }

  changeBacklogItemState(backlogItemId: string, state: string ) {
    return this.http.put(AppSettings.getProjectUrl() + '/backlogItems/' + backlogItemId + '/' + state, {},{headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleErrorDelete(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private handleError(error: Response | any) {
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
