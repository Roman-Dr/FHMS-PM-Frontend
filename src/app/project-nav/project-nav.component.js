"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var project_service_1 = require("../_services/project.service");
var ProjectNavComponent = (function () {
    function ProjectNavComponent(projectService) {
        this.projectService = projectService;
    }
    ProjectNavComponent.prototype.ngOnInit = function () {
        if (sessionStorage.getItem('project_id') !== null) {
            this.getProject();
        }
    };
    ProjectNavComponent.prototype.getProject = function () {
        var _this = this;
        this.projectService.getProject(sessionStorage.getItem('project_id'))
            .subscribe(function (project) { return _this.project = project; }, function (error) { return _this.errorMessage = error; });
    };
    ProjectNavComponent = __decorate([
        core_1.Component({
            selector: 'app-project-nav',
            templateUrl: './project-nav.component.html',
            styleUrls: ['./project-nav.component.css'],
            providers: [project_service_1.ProjectService]
        })
    ], ProjectNavComponent);
    return ProjectNavComponent;
}());
exports.ProjectNavComponent = ProjectNavComponent;
