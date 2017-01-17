"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_router_1 = require('./app.router');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var app_component_1 = require('./app.component');
var landing_component_1 = require('./landing/landing.component');
var backlog_component_1 = require('./backlog/backlog.component');
var board_component_1 = require('./board/board.component');
var sprint_component_1 = require('./sprint/sprint.component');
var estimation_component_1 = require('./estimation/estimation.component');
var roadmap_component_1 = require('./roadmap/roadmap.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var user_story_component_1 = require('./user-story/user-story.component');
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var project_component_1 = require('./project/project.component');
var project_nav_component_1 = require('./project-nav/project-nav.component');
var authentication_service_1 = require("./_services/authentication.service");
var user_service_1 = require("./_services/user.service");
var router_1 = require("@angular/router");
var project_service_1 = require("./_services/project.service");
var chart_component_1 = require('./chart/chart.component');
var ng2_dnd_1 = require('ng2-dnd');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                landing_component_1.LandingComponent,
                backlog_component_1.BacklogComponent,
                board_component_1.BoardComponent,
                sprint_component_1.SprintComponent,
                estimation_component_1.EstimationComponent,
                roadmap_component_1.RoadmapComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                user_story_component_1.UserStoryComponent,
                project_component_1.ProjectComponent,
                project_nav_component_1.ProjectNavComponent,
                chart_component_1.ChartComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                router_1.RouterModule.forRoot(app_router_1.routes),
                ng2_dnd_1.DndModule.forRoot()
            ],
            providers: [user_service_1.UserService, authentication_service_1.AuthenticationService, project_service_1.ProjectService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
