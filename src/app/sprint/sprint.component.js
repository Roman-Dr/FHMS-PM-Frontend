"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var sprint_service_1 = require("../_services/sprint.service");
var user_service_1 = require("../_services/user.service");
var SprintComponent = (function () {
    function SprintComponent(sprintService, userService) {
        this.sprintService = sprintService;
        this.userService = userService;
    }
    SprintComponent.prototype.ngOnInit = function () {
        this.getSprints();
        this.getUsers();
    };
    SprintComponent.prototype.getSprints = function () {
        var _this = this;
        this.sprintService.getSprints()
            .subscribe(function (sprints) { return _this.sprints = sprints; }, function (error) { return _this.errorMessage = error; });
    };
    SprintComponent.prototype.getSprint = function (sprintId) {
        var _this = this;
        this.sprintService.getSprint(sprintId)
            .subscribe(function (sprint) { return _this.sprint = sprint; }, function (error) { return _this.errorMessage = error; });
    };
    SprintComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    SprintComponent.prototype.getSprintCapacities = function (sprintId) {
        var _this = this;
        this.sprintService.getSprintCapacities(sprintId)
            .subscribe(function (sprintCapacities) { return _this.sprintCapacities = sprintCapacities; }, function (error) { return _this.errorMessage = error; });
    };
    SprintComponent.prototype.createSprint = function (sprintName, startDate, endDate) {
        var _this = this;
        this.sprintService.createSprint(sprintName, startDate, endDate)
            .subscribe(function (success) { return _this.getSprints(); }, function (error) { return _this.errorMessage = error; });
    };
    SprintComponent.prototype.updateSprint = function (sprintId, sprintName, startDate, endDate) {
        var _this = this;
        this.sprintService.updateSprint(sprintId, sprintName, startDate, endDate)
            .subscribe(function (success) { return _this.getSprints(); });
    };
    SprintComponent.prototype.deleteSprint = function (sprintId) {
        var _this = this;
        this.sprintService.deleteSprint(sprintId)
            .subscribe(function (success) { return _this.getSprints(); }, function (error) { return _this.errorMessage = error; });
    };
    SprintComponent.prototype.createSprintCapacity = function (sprintId, userId, dayOff, capacityPerDay) {
        var _this = this;
        this.sprintService.createSprintCapacity(sprintId, userId, dayOff, capacityPerDay)
            .subscribe(function (success) { return _this.getSprintCapacities(sprintId); }, function (error) { return _this.errorMessage = error; });
    };
    SprintComponent = __decorate([
        core_1.Component({
            selector: 'app-sprint',
            templateUrl: './sprint.component.html',
            styleUrls: ['./sprint.component.css'],
            providers: [sprint_service_1.SprintService, user_service_1.UserService]
        })
    ], SprintComponent);
    return SprintComponent;
}());
exports.SprintComponent = SprintComponent;
