"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var SprintService = (function () {
    function SprintService(http) {
        this.http = http;
        this._apiUrl = sessionStorage.getItem('project_url') + '/sprints/';
        // private _apiUrl = 'http://localhost:3000/api/projects/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    SprintService.prototype.createSprint = function (sprintName, startDate, endDate) {
        return this.http.post(this._apiUrl, JSON.stringify({ sprintName: sprintName, startDate: startDate, endDate: endDate }), { withCredentials: true, headers: this.headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Create Sprint successful");
                return res.json();
            }
        });
    };
    SprintService.prototype.updateSprint = function (sprintId, sprintName, startDate, endDate) {
        return this.http.put(this._apiUrl + sprintId, JSON.stringify({ sprintName: sprintName, startDate: startDate, endDate: endDate }), { withCredentials: true, headers: this.headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Create Sprint successful");
                return res.json();
            }
        });
    };
    SprintService.prototype.deleteSprint = function (sprintId) {
        return this.http.delete(this._apiUrl + sprintId, { withCredentials: true, headers: this.headers })
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
    SprintService.prototype.createSprintCapacity = function (sprintId, userId, daysOff, capacityPerDay) {
        return this.http.post(this._apiUrl + sprintId + "/sprintcapacities", JSON.stringify({ userId: userId, daysOff: daysOff, capacityPerDay: capacityPerDay }), { withCredentials: true, headers: this.headers })
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                console.log("Create Sprint Capacity successful");
                return res.json();
            }
        });
    };
    SprintService.prototype.getSprints = function () {
        return this.http.get(this._apiUrl, { withCredentials: true, headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    SprintService.prototype.getSprint = function (sprintId) {
        return this.http.get(this._apiUrl + sprintId, { withCredentials: true, headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    SprintService.prototype.getSprintCapacities = function (sprintId) {
        return this.http.get(this._apiUrl + sprintId + "/sprintcapacities", { withCredentials: true, headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    SprintService = __decorate([
        core_1.Injectable()
    ], SprintService);
    return SprintService;
}());
exports.SprintService = SprintService;
