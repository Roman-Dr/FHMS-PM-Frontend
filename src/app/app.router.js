"use strict";
var landing_component_1 = require('./landing/landing.component');
var backlog_component_1 = require('./backlog/backlog.component');
var board_component_1 = require('./board/board.component');
var sprint_component_1 = require('./sprint/sprint.component');
var estimation_component_1 = require('./estimation/estimation.component');
var chart_component_1 = require('./chart/chart.component');
var roadmap_component_1 = require('./roadmap/roadmap.component');
var user_story_component_1 = require('./user-story/user-story.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var project_component_1 = require("./project/project.component");
var authentication_service_1 = require("./_services/authentication.service");
exports.routes = [
    { path: '', component: login_component_1.LoginComponent, pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'projects', component: project_component_1.ProjectComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'landing', component: landing_component_1.LandingComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'backlog', component: backlog_component_1.BacklogComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'board', component: board_component_1.BoardComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'sprints', component: sprint_component_1.SprintComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'estimation', component: estimation_component_1.EstimationComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'chart', component: chart_component_1.ChartComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'roadmap', component: roadmap_component_1.RoadmapComponent, canActivate: [authentication_service_1.AuthenticationService] },
    { path: 'user-story', component: user_story_component_1.UserStoryComponent, canActivate: [authentication_service_1.AuthenticationService] }
];
