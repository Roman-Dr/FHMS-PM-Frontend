"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var backlog_data_service_1 = require('../_services/backlog-data.service');
var user_story_data_service_1 = require('../_services/user-story-data.service');
var task_service_1 = require("../_services/task.service");
var BacklogComponent = (function () {
    function BacklogComponent(backlogDataService, userService, userStoryDataService, taskDataService) {
        this.backlogDataService = backlogDataService;
        this.userService = userService;
        this.userStoryDataService = userStoryDataService;
        this.taskDataService = taskDataService;
    }
    BacklogComponent.prototype.removeBacklogitem = function (backlogitem) {
        var _this = this;
        console.log("Component: " + backlogitem._id);
        this.backlogDataService.deleteBacklogitem(backlogitem._id).subscribe(function (data) {
            _this.loadBacklogitems();
        });
    };
    /* removeBacklogitemTask(task_id, backlogitem_id){
       this.taskDataService.deleteBacklogitemTask(task_id, backlogitem_id).subscribe(
         data => {
           this.getTasks(backlogitem_id)
         }
       );
     }*/
    BacklogComponent.prototype.loadBacklogitems = function () {
        var _this = this;
        this.backlogDataService.getBacklogitems()
            .subscribe(function (backlogitems) { return _this.backlogitems = backlogitems; }, function (err) {
            console.log(err);
        });
    };
    BacklogComponent.prototype.ngOnInit = function () {
        this.loadBacklogitems();
        this.getUsers();
        this.loadUserStories();
    };
    BacklogComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    BacklogComponent.prototype.getTasks = function (backlogitem_id) {
        var _this = this;
        this.taskDataService.getTasks(backlogitem_id)
            .subscribe(function (tasks) { return _this.backlogitemTasks = tasks; }, function (error) { return _this.errorMessage = error; });
    };
    BacklogComponent.prototype.addTask = function (backlogitem) {
        var _this = this;
        console.log(this.backlogitemTask);
        this.backlogDataService.postTask(backlogitem._id, this.backlogitemTask, this.backlogitemTaskAuthor).subscribe(function (data) {
            _this.getTasks(backlogitem._id);
        });
    };
    BacklogComponent.prototype.addBacklogitem = function () {
        var _this = this;
        if ((!this.backlogitemTitle) || (!this.backlogitemAuthor) || (!this.backlogitemDescription) || (!this.backlogitemAssignedTo)) {
            console.log("BacklogTitle(" + this.backlogitemTitle + ") oder BacklogAuthor(" + this.backlogitemAuthor + ") oder BacklogDescription(" + this.backlogitemDescription + ") oder BacklogAssignedTo(" + this.backlogitemAssignedTo + ") sind leer: Component Backlog");
            this.backlogitemTitle = null;
            this.backlogitemAuthor = null;
            this.backlogitemDescription = null;
            this.backlogitemAssignedTo = null;
        }
        else {
            console.log("1");
            this.backlogDataService.postBacklogitemRestful(this.backlogitemTitle, this.backlogitemState, this.backlogitemAuthor, this.backlogitemDescription, this.backlogitemAssignedTo).subscribe(
            //data => this.postMyUserStoriesToServer = JSON.stringify(data),
            function (data) {
                _this.loadBacklogitems();
            });
            this.backlogitemTitle = null;
            this.backlogitemAuthor = null;
            this.backlogitemDescription = null;
            this.backlogitemAssignedTo = null;
        }
    };
    BacklogComponent.prototype.loadUserStories = function () {
        var _this = this;
        this.userStoryDataService.getUserStories()
            .subscribe(function (userstories) { return _this.userstories = userstories; }, function (err) {
            console.log(err);
        });
    };
    BacklogComponent = __decorate([
        core_1.Component({
            selector: 'app-backlog',
            templateUrl: './backlog.component.html',
            styleUrls: ['./backlog.component.css'],
            providers: [backlog_data_service_1.BacklogDataService, user_story_data_service_1.UserStoryDataService, task_service_1.TaskService]
        })
    ], BacklogComponent);
    return BacklogComponent;
}());
exports.BacklogComponent = BacklogComponent;
