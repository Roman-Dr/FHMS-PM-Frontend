"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var project_service_1 = require("../_services/project.service");
var user_service_1 = require("../_services/user.service");
var authentication_service_1 = require("../_services/authentication.service");
var ProjectComponent = (function () {
    function ProjectComponent(projectService, userService) {
        this.projectService = projectService;
        this.userService = userService;
        this.create = false;
        this.projectSelected = !!sessionStorage.getItem('project_id');
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.getProjects();
        this.getUsers();
    };
    ProjectComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.getProjects()
            .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
    };
    ProjectComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    ProjectComponent.prototype.getUser = function (userId) {
        var _this = this;
        this.userService.getUser(userId)
            .subscribe(function (user) { return _this.user = user; }, function (error) { return _this.errorMessage = error; });
    };
    ProjectComponent.prototype.chooseProject = function (projectId) {
        this.projectService.chooseProject(projectId);
    };
    ProjectComponent.prototype.removeProject = function (projectId) {
        var _this = this;
        this.projectService.removeProject(projectId)
            .subscribe(function (success) { return _this.getProjects(); });
    };
    ProjectComponent.prototype.createProject = function (displayName, description, dueDate, stakeholders, contributors) {
        var _this = this;
        this.projectService.createProject(displayName, description, dueDate, sessionStorage.getItem('user_id'), stakeholders, contributors)
            .subscribe(function (success) {
            _this.getProjects();
            _this.showCreation();
        });
    };
    ProjectComponent.prototype.updateProject = function (projectId, displayName, description, dueDate, stakeholders, contributors) {
        var _this = this;
        this.projectService.updateProject(projectId, displayName, description, dueDate, sessionStorage.getItem('user_id'), stakeholders, contributors)
            .subscribe(function (success) {
            _this.getProjects();
        });
    };
    ProjectComponent.prototype.showCreation = function () {
        if (this.create) {
            this.create = false;
        }
        else {
            this.create = true;
        }
    };
    ProjectComponent = __decorate([
        core_1.Component({
            selector: 'app-project',
            templateUrl: './project.component.html',
            styleUrls: ['./project.component.css'],
            providers: [project_service_1.ProjectService, user_service_1.UserService, authentication_service_1.AuthenticationService]
        })
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
