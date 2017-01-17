"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var backlog_data_service_1 = require("../_services/backlog-data.service");
var BoardComponent = (function () {
    function BoardComponent(backlogDataService) {
        this.backlogDataService = backlogDataService;
    }
    BoardComponent.prototype.ngOnInit = function () {
        this.getBacklogitems();
    };
    BoardComponent.prototype.getBacklogitems = function () {
        var _this = this;
        this.backlogDataService.getBacklogitems()
            .subscribe(function (backlogitems) { return _this.backlogitems = backlogitems; }, function (err) {
            console.log(err);
        });
    };
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'app-board',
            templateUrl: './board.component.html',
            styleUrls: ['./board.component.css'],
            providers: [backlog_data_service_1.BacklogDataService]
        })
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
