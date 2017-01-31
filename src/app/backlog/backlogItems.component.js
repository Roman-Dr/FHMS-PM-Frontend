"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BacklogItemsComponent = (function () {
    function BacklogItemsComponent(backlogDataService, userService, userStoryDataService, taskDataService) {
        this.backlogDataService = backlogDataService;
        this.userService = userService;
        this.userStoryDataService = userStoryDataService;
        this.taskDataService = taskDataService;
        this.displayNameTest = "TEST";
    }
    BacklogItemsComponent.prototype.removeBacklogitem = function (backlogitem) {
        var _this = this;
        console.log("Component: " + backlogitem._id);
        this.backlogDataService.deleteBacklogitem(backlogitem._id).subscribe(function (data) {
            _this.loadBacklogitems();
        });
    };
    BacklogItemsComponent.prototype.updateBacklog = function (backlogitem_id, title, authorId, state, description, userstoryId) {
        var _this = this;
        this.backlogDataService.updateBacklog(backlogitem_id, title, authorId, state, description, userstoryId)
            .subscribe(function (success) {
            return _this.loadBacklogitems();
        });
    };
    BacklogItemsComponent.prototype.removeTask = function (backlogitem_id, task_id) {
        var _this = this;
        this.taskDataService.deleteTask(backlogitem_id, task_id).subscribe(function (data) {
            _this.getTasks(backlogitem_id);
        });
    };
    BacklogItemsComponent.prototype.loadBacklogitems = function () {
        var _this = this;
        this.backlogDataService.getBacklogitems()
            .subscribe(function (backlogitems) { return _this.backlogitems = backlogitems; }, function (err) {
            console.log(err);
        });
    };
    BacklogItemsComponent.prototype.ngOnInit = function () {
        this.loadBacklogitems();
        this.getUsers();
        this.loadUserStories();
    };
    BacklogItemsComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    BacklogItemsComponent.prototype.getTasks = function (backlogitem_id) {
        var _this = this;
        this.taskDataService.getTasks(backlogitem_id)
            .subscribe(function (tasks) { return _this.backlogitemTasks = tasks; }, function (error) { return _this.errorMessage = error; });
    };
    BacklogItemsComponent.prototype.addTask = function (backlogitem) {
        var _this = this;
        console.log(this.backlogitemTask);
        this.backlogDataService.postTask(backlogitem._id, this.backlogitemTask, this.backlogitemTaskAuthor).subscribe(function (data) {
            _this.getTasks(backlogitem._id);
        });
    };
    BacklogItemsComponent.prototype.addBacklogitem = function () {
        var _this = this;
        if ((!this.backlogitemTitle) || (!this.backlogitemAuthor) || (!this.backlogitemDescription) || (!this.backlogitemAssignedTo)) {
            console.log("BacklogTitle(" + this.backlogitemTitle + ") oder BacklogAuthor(" + this.backlogitemAuthor + ") oder BacklogDescription(" + this.backlogitemDescription + ") oder BacklogAssignedTo(" + this.backlogitemAssignedTo + ") sind leer: Component Backlog");
            this.backlogitemTitle = null;
            this.backlogitemAuthor = null;
            this.backlogitemDescription = null;
            this.backlogitemAssignedTo = null;
        }
        else {
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
    BacklogItemsComponent.prototype.loadUserStories = function () {
        var _this = this;
        this.userStoryDataService.getUserStories()
            .subscribe(function (userstories) { return _this.userstories = userstories; }, function (err) {
            console.log(err);
        });
    };
    BacklogItemsComponent = __decorate([
        core_1.Component({
            selector: 'app-backlogItems',
            templateUrl: './backlogItems.component.html',
            styleUrls: ['./backlogItems.component.css']
        })
    ], BacklogItemsComponent);
    return BacklogItemsComponent;
}());
exports.BacklogItemsComponent = BacklogItemsComponent;
