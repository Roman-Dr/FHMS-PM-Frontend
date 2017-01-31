"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserStory_1 = require('../_models/UserStory');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var app_settings_1 = require("../app.settings");
var UserStoryDataService = (function () {
    function UserStoryDataService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserStoryDataService.prototype.toggleUserStory = function (userstoryObject, changedcomplete) {
        return this.http.put(app_settings_1.AppSettings.getProjectUrl() + '/userstories/' + userstoryObject._id, JSON.stringify({
            "title": userstoryObject.title,
            "complete": changedcomplete,
            "authorId": userstoryObject.authorId
        }), { withCredentials: true, headers: this.headers })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Update Backlog successful");
                return res.json();
            }
        });
    };
    UserStoryDataService.prototype.editUserstory = function (userstory_id, title, state, author) {
        return this.http.put(app_settings_1.AppSettings.getProjectUrl() + '/userstories/' + userstory_id, JSON.stringify({ "title": title, "complete": state, "authorId": author }), {
            withCredentials: true,
            headers: this.headers
        })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Update Backlog successful");
                return res.json();
            }
        });
    };
    UserStoryDataService.prototype.deleteUserStory = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        console.log("Service: " + id);
        return this.http.delete(app_settings_1.AppSettings.getProjectUrl() + '/userstories/' + id, { headers: headers })
            .map(this.extractData)
            .catch(this.handleErrorDelete);
    };
    UserStoryDataService.prototype.postUserStoryRestful = function (userStoryName, userStoryComplete, userStoryAuthor) {
        console.log(userStoryName + "; " + userStoryAuthor);
        var body = JSON.stringify({ "title": userStoryName, "complete": userStoryComplete, "authorId": userStoryAuthor });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        console.log("vorPostService");
        return this.http.post(app_settings_1.AppSettings.getProjectUrl() + '/userstories/', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserStoryDataService.prototype.getUserStories = function () {
        return this.http.get(app_settings_1.AppSettings.getProjectUrl() + '/userstories/')
            .map(function (responseData) {
            return responseData.json();
        })
            .map(function (userStories) {
            var result = [];
            if (userStories) {
                userStories.forEach(function (x) {
                    result.push(new UserStory_1.UserStory(x));
                });
            }
            return result;
        });
    };
    UserStoryDataService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    UserStoryDataService.prototype.handleErrorDelete = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    UserStoryDataService.prototype.handleError = function (error) {
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
        console.log("nachPostService");
        return Rx_1.Observable.throw(errMsg);
    };
    UserStoryDataService = __decorate([
        core_1.Injectable()
    ], UserStoryDataService);
    return UserStoryDataService;
}());
exports.UserStoryDataService = UserStoryDataService;
