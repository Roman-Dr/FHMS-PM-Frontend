"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/Rx');
var BacklogDataService = (function () {
    function BacklogDataService(http) {
        this.http = http;
        this.backlogitemsUrl = sessionStorage.getItem('project_url') + '/backlogitems';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    BacklogDataService.prototype.updateBacklog = function (backlogName, backlogState, backlogAuthor, backlogDescription, backlogAssignedTo) {
        return this.http.put(this.backlogitemsUrl, JSON.stringify({ backlogName: backlogName, backlogState: backlogState, backlogAuthor: backlogAuthor, backlogDescription: backlogDescription, backlogAssignedTo: backlogAssignedTo }), { withCredentials: true, headers: this.headers })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Update Project successful");
                return res.json();
            }
        });
    };
    BacklogDataService.prototype.deleteBacklogitem = function (id) {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        console.log("Service: " + id);
        return this.http.delete(this.backlogitemsUrl + "/" + id, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleErrorDelete);
    };
    BacklogDataService.prototype.postTask = function (backlogitem_id, task, taskauthor) {
        console.log(task);
        var body = JSON.stringify({ "title": task, "authorId": taskauthor });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        return this.http.post(this.backlogitemsUrl + "/" + backlogitem_id + "/tasks", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BacklogDataService.prototype.postBacklogitemRestful = function (backlogName, backlogState, backlogAuthor, backlogDescription, backlogAssignedTo) {
        console.log(backlogName + "; " + backlogAuthor);
        var body = JSON.stringify({ "title": backlogName, "state": backlogState, "authorId": backlogAuthor, "description": backlogDescription, "userStoryId": backlogAssignedTo });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        console.log("vorPostService Backlog");
        return this.http.post(this.backlogitemsUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    BacklogDataService.prototype.getBacklogitems = function () {
        return this.http.get(this.backlogitemsUrl)
            .map(function (res) { return res.json(); });
    };
    BacklogDataService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    BacklogDataService.prototype.handleErrorDelete = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    BacklogDataService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        console.log("nachPostService Backlog");
        return Rx_1.Observable.throw(errMsg);
    };
    BacklogDataService = __decorate([
        core_1.Injectable()
    ], BacklogDataService);
    return BacklogDataService;
}());
exports.BacklogDataService = BacklogDataService;
