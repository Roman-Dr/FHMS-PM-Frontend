"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_story_data_service_1 = require('../_services/user-story-data.service');
var UserStoryComponent = (function () {
    function UserStoryComponent(userStoryDataService, userService) {
        this.userStoryDataService = userStoryDataService;
        this.userService = userService;
        this.userStoryComplete = "false";
    }
    UserStoryComponent.prototype.removeUserStory = function (userstory) {
        var _this = this;
        console.log("Component: " + userstory._id);
        this.userStoryDataService.deleteUserStory(userstory._id).subscribe(function (data) {
            _this.loadUserStories();
        });
    };
    UserStoryComponent.prototype.loadUserStories = function () {
        var _this = this;
        this.userStoryDataService.getUserStories()
            .subscribe(function (userstories) { return _this.userstories = userstories; }, function (err) {
            console.log(err);
        });
    };
    UserStoryComponent.prototype.ngOnInit = function () {
        this.loadUserStories();
        this.getUsers();
    };
    UserStoryComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    UserStoryComponent.prototype.addUserStory = function () {
        var _this = this;
        this.userStoryAuthor = sessionStorage.getItem("user_id");
        if ((!this.userStoryAuthor) || (!this.userStoryName)) {
            console.log("UserStoryName(" + this.userStoryName + ") oder UserStoryAuthor(" + this.userStoryAuthor + ") sind leer: Component");
            this.userStoryAuthor = null;
            this.userStoryName = null;
        }
        else {
            console.log("1");
            this.userStoryDataService.postUserStoryRestful(this.userStoryName, this.userStoryComplete, this.userStoryAuthor).subscribe(
            //data => this.postMyUserStoriesToServer = JSON.stringify(data),
            function (data) {
                _this.loadUserStories();
            });
            this.userStoryAuthor = null;
            this.userStoryName = null;
        }
    };
    UserStoryComponent = __decorate([
        core_1.Component({
            selector: 'app-UserStory',
            templateUrl: './user-story.component.html',
            styleUrls: ['./user-story.component.css'],
            providers: [user_story_data_service_1.UserStoryDataService]
        })
    ], UserStoryComponent);
    return UserStoryComponent;
}());
exports.UserStoryComponent = UserStoryComponent;
