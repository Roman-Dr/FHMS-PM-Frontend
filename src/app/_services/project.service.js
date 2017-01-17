"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/Rx');
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        this._apiUrl = 'http://10.60.67.20:3000/api/projects/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this._canActivate = false;
    }
    ProjectService.prototype.canActivate = function () {
        return this._canActivate;
    };
    ProjectService.prototype.getProjects = function () {
        return this.http.get(this._apiUrl, { withCredentials: true })
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.getProject = function (projectId) {
        return this.http.get(this._apiUrl + projectId, { withCredentials: true })
            .map(function (res) { return res.json(); });
    };
    ProjectService.prototype.chooseProject = function (projectId) {
        this._canActivate = true;
        sessionStorage.setItem('project_id', projectId);
        sessionStorage.setItem('project_url', this._apiUrl + projectId);
    };
    ProjectService.prototype.createProject = function (displayName, description, dueDate, owner, stakeholders, contributors) {
        return this.http.post(this._apiUrl, JSON.stringify({ displayName: displayName, description: description, dueDate: dueDate, owner: owner, stakeholders: stakeholders, contributors: contributors }), {
            withCredentials: true,
            headers: this.headers
        })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Create Project successful");
                return res.json();
            }
        });
    };
    ProjectService.prototype.updateProject = function (projectId, displayName, description, dueDate, owner, stakeholders, contributors) {
        return this.http.put(this._apiUrl + projectId, JSON.stringify({ displayName: displayName, description: description, dueDate: dueDate, owner: owner, stakeholders: stakeholders, contributors: contributors }), {
            withCredentials: true,
            headers: this.headers
        })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Update Project successful");
                return res.json();
            }
        });
    };
    ProjectService.prototype.removeProject = function (projectId) {
        return this.http.delete(this._apiUrl + projectId, { withCredentials: true, headers: this.headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Delete Project successful");
                return res.json();
            }
        });
    };
    ProjectService.prototype.setProjectSelectedFalse = function () {
        this._canActivate = false;
    };
    ProjectService = __decorate([
        core_1.Injectable()
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
